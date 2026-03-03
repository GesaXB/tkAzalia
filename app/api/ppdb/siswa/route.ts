import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth';
import { ensureSiswaForUser } from '@/lib/ppdb';
import { prisma } from '@/lib/prisma';

/** POST: ensure siswa exists (create if not) */
async function postHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const siswa = await ensureSiswaForUser(req.user.userId);
    const withKelas = await prisma.siswa.findUnique({
      where: { siswa_id: siswa.siswa_id },
      include: { kelas: true },
    });
    return NextResponse.json({
      success: true,
      data: {
        siswa_id: withKelas?.siswa_id ?? siswa.siswa_id,
        kelas_id: withKelas?.kelas_id ?? siswa.kelas_id ?? null,
        kelas: withKelas?.kelas ?? null,
      },
    }, { status: 200 });
  } catch (err) {
    console.error('POST /api/ppdb/siswa:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal memastikan data siswa' },
      { status: 500 }
    );
  }
}

/** GET: data siswa current user (termasuk kelas dan PPDB data) */
async function getHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const siswa = await prisma.siswa.findUnique({
      where: { user_id: req.user.userId },
      include: { kelas: true },
    });
    if (!siswa) {
      return NextResponse.json(
        { success: false, error: 'Data siswa tidak ditemukan' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      data: {
        siswa_id: siswa.siswa_id,
        kelas_id: siswa.kelas_id,
        kelas: siswa.kelas,
        status_ppdb: siswa.status_ppdb,
        // Data Calon Siswa
        nama_anak: siswa.nama_anak,
        nama_panggilan: siswa.nama_panggilan,
        tempat_lahir: siswa.tempat_lahir,
        tanggal_lahir: siswa.tanggal_lahir,
        jenis_kelamin: siswa.jenis_kelamin,
        anak_ke: siswa.anak_ke,
        // Data Orang Tua / Wali
        nama_ayah: siswa.nama_ayah,
        pekerjaan_ayah: siswa.pekerjaan_ayah,
        nama_ibu: siswa.nama_ibu,
        pekerjaan_ibu: siswa.pekerjaan_ibu,
        no_whatsapp: siswa.no_whatsapp,
        alamat_rumah: siswa.alamat_rumah,
      },
    }, { status: 200 });
  } catch (err) {
    console.error('GET /api/ppdb/siswa:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal memuat data' },
      { status: 500 }
    );
  }
}

/** PATCH: siswa update data (kelas_id, PPDB data, etc) */
interface PatchBody {
  kelas_id?: number | null;
  // Data Calon Siswa
  nama_anak?: string | null;
  nama_panggilan?: string | null;
  tempat_lahir?: string | null;
  tanggal_lahir?: string | null; // ISO date string
  jenis_kelamin?: string | null;
  anak_ke?: number | null;
  // Data Orang Tua / Wali
  nama_ayah?: string | null;
  pekerjaan_ayah?: string | null;
  nama_ibu?: string | null;
  pekerjaan_ibu?: string | null;
  no_whatsapp?: string | null;
  alamat_rumah?: string | null;
}

async function patchHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = (await (req as NextRequest).json()) as PatchBody;
    const siswa = await prisma.siswa.findUnique({
      where: { user_id: req.user.userId },
    });
    if (!siswa) {
      return NextResponse.json(
        { success: false, error: 'Data siswa tidak ditemukan' },
        { status: 404 }
      );
    }
    
    // Validate kelas_id if provided
    if ('kelas_id' in body) {
      const kelasId = body.kelas_id;
      if (kelasId !== null && (typeof kelasId !== 'number' || kelasId < 1)) {
        return NextResponse.json(
          { success: false, error: 'kelas_id harus number positif atau null' },
          { status: 400 }
        );
      }
      if (kelasId !== null) {
        const exists = await prisma.kelas.findUnique({ where: { kelas_id: kelasId } });
        if (!exists) {
          return NextResponse.json(
            { success: false, error: 'Kelas tidak ditemukan' },
            { status: 400 }
          );
        }
      }
    }

    // Build update data - only include fields that are provided
    const updateData: Record<string, any> = {};
    
    if ('kelas_id' in body) updateData.kelas_id = body.kelas_id ?? null;
    if ('nama_anak' in body) updateData.nama_anak = body.nama_anak ?? null;
    if ('nama_panggilan' in body) updateData.nama_panggilan = body.nama_panggilan ?? null;
    if ('tempat_lahir' in body) updateData.tempat_lahir = body.tempat_lahir ?? null;
    if ('tanggal_lahir' in body) updateData.tanggal_lahir = body.tanggal_lahir ? new Date(body.tanggal_lahir) : null;
    if ('jenis_kelamin' in body) updateData.jenis_kelamin = body.jenis_kelamin ?? null;
    if ('anak_ke' in body) updateData.anak_ke = body.anak_ke ?? null;
    if ('nama_ayah' in body) updateData.nama_ayah = body.nama_ayah ?? null;
    if ('pekerjaan_ayah' in body) updateData.pekerjaan_ayah = body.pekerjaan_ayah ?? null;
    if ('nama_ibu' in body) updateData.nama_ibu = body.nama_ibu ?? null;
    if ('pekerjaan_ibu' in body) updateData.pekerjaan_ibu = body.pekerjaan_ibu ?? null;
    if ('no_whatsapp' in body) updateData.no_whatsapp = body.no_whatsapp ?? null;
    if ('alamat_rumah' in body) updateData.alamat_rumah = body.alamat_rumah ?? null;

    const updated = await prisma.siswa.update({
      where: { siswa_id: siswa.siswa_id },
      data: updateData,
      include: { kelas: true },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          siswa_id: updated.siswa_id,
          kelas_id: updated.kelas_id,
          kelas: updated.kelas,
          // Include PPDB data in response
          nama_anak: updated.nama_anak,
          nama_panggilan: updated.nama_panggilan,
          tempat_lahir: updated.tempat_lahir,
          tanggal_lahir: updated.tanggal_lahir,
          jenis_kelamin: updated.jenis_kelamin,
          anak_ke: updated.anak_ke,
          nama_ayah: updated.nama_ayah,
          pekerjaan_ayah: updated.pekerjaan_ayah,
          nama_ibu: updated.nama_ibu,
          pekerjaan_ibu: updated.pekerjaan_ibu,
          no_whatsapp: updated.no_whatsapp,
          alamat_rumah: updated.alamat_rumah,
        },
        message: 'Data siswa berhasil disimpan',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('PATCH /api/ppdb/siswa:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal menyimpan' },
      { status: 500 }
    );
  }
}

export const GET = authMiddleware(getHandler, ['user', 'admin']);
export const POST = authMiddleware(postHandler, ['user', 'admin']);
export const PATCH = authMiddleware(patchHandler, ['user', 'admin']);

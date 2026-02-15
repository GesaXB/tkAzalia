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

/** GET: data siswa current user (termasuk kelas) */
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

/** PATCH: siswa update kelas_id (pilihan kelas PPDB) */
interface PatchBody {
  kelas_id: number | null;
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
    const updated = await prisma.siswa.update({
      where: { siswa_id: siswa.siswa_id },
      data: { kelas_id: kelasId ?? null },
      include: { kelas: true },
    });
    return NextResponse.json(
      {
        success: true,
        data: {
          siswa_id: updated.siswa_id,
          kelas_id: updated.kelas_id,
          kelas: updated.kelas,
        },
        message: 'Pilihan kelas berhasil disimpan',
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

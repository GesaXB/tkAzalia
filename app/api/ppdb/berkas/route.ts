import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth';
import { createBerkasSiswa, listBerkasForSiswa, ensureSiswaForUser } from '@/lib/ppdb';

interface CreateBerkasBody {
  jenis_berkas_id: number;
  nama_file: string;
  path_file: string;
  ukuran_file: number;
  tipe_file: string;
  nama_file_hash?: string;
}

async function getHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const siswa = await ensureSiswaForUser(req.user.userId);
    const berkas = await listBerkasForSiswa(siswa.siswa_id);
    return NextResponse.json({ success: true, data: berkas }, { status: 200 });
  } catch (err) {
    console.error('GET /api/ppdb/berkas:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal memuat berkas' },
      { status: 500 }
    );
  }
}

async function postHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = (await (req as NextRequest).json()) as CreateBerkasBody;
    if (
      !body.jenis_berkas_id ||
      !body.nama_file ||
      !body.path_file ||
      !body.ukuran_file ||
      !body.tipe_file
    ) {
      return NextResponse.json(
        { success: false, error: 'Data berkas tidak lengkap' },
        { status: 400 }
      );
    }
    const siswa = await ensureSiswaForUser(req.user.userId);
    const namaFileHash =
      body.nama_file_hash || `hash_${Date.now()}_${siswa.siswa_id}_${body.jenis_berkas_id}`;
    const berkas = await createBerkasSiswa({
      siswaId: siswa.siswa_id,
      jenisBerkasId: body.jenis_berkas_id,
      namaFile: body.nama_file,
      namaFileHash,
      pathFile: body.path_file,
      ukuranFile: body.ukuran_file,
      tipeFile: body.tipe_file,
    });
    return NextResponse.json(
      { success: true, data: berkas, message: 'Berkas siswa berhasil disimpan' },
      { status: 201 }
    );
  } catch (err) {
    console.error('POST /api/ppdb/berkas:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal menyimpan berkas' },
      { status: 500 }
    );
  }
}

export const GET = authMiddleware(getHandler, ['user', 'admin']);
export const POST = authMiddleware(postHandler, ['user', 'admin']);


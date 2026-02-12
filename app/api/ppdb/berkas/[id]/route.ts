import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth';
import {
  ensureSiswaForUser,
  getBerkasById,
  updateBerkasSiswa,
  deleteBerkasSiswa,
} from '@/lib/ppdb';

interface RouteContext {
  params: Promise<{ id: string }>;
}

async function patchHandler(
  req: AuthenticatedRequest,
  context: RouteContext
): Promise<NextResponse<ApiResponse>> {
  const id = Number((await context.params).id);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json(
      { success: false, error: 'ID berkas tidak valid' },
      { status: 400 }
    );
  }

  const siswa = await ensureSiswaForUser(req.user.userId);
  const existing = await getBerkasById(id);
  if (!existing || existing.siswa_id !== siswa.siswa_id) {
    return NextResponse.json(
      { success: false, error: 'Berkas tidak ditemukan atau bukan milik Anda' },
      { status: 404 }
    );
  }

  const body = (await (req as NextRequest).json()) as {
    nama_file?: string;
    path_file?: string;
    ukuran_file?: number;
    tipe_file?: string;
  };

  const data = await updateBerkasSiswa(id, {
    nama_file: body.nama_file,
    path_file: body.path_file,
    ukuran_file: body.ukuran_file,
    tipe_file: body.tipe_file,
  });

  return NextResponse.json(
    {
      success: true,
      data,
      message: 'Berkas berhasil diperbarui',
    },
    { status: 200 }
  );
}

async function deleteHandler(
  req: AuthenticatedRequest,
  context: RouteContext
): Promise<NextResponse<ApiResponse>> {
  const id = Number((await context.params).id);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json(
      { success: false, error: 'ID berkas tidak valid' },
      { status: 400 }
    );
  }

  const siswa = await ensureSiswaForUser(req.user.userId);
  const existing = await getBerkasById(id);
  if (!existing || existing.siswa_id !== siswa.siswa_id) {
    return NextResponse.json(
      { success: false, error: 'Berkas tidak ditemukan atau bukan milik Anda' },
      { status: 404 }
    );
  }

  await deleteBerkasSiswa(id);

  return NextResponse.json(
    {
      success: true,
      message: 'Berkas berhasil dihapus',
    },
    { status: 200 }
  );
}

export const PATCH = authMiddleware(patchHandler, ['user', 'admin']);
export const DELETE = authMiddleware(deleteHandler, ['user', 'admin']);

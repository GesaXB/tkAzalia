import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth';
import { ensureSiswaForUser, getSiswaForUser } from '@/lib/ppdb';

async function getHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const siswa = await getSiswaForUser(req.user.userId);
    if (!siswa) {
      return NextResponse.json(
        { success: false, error: 'Data siswa belum tersedia' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: siswa }, { status: 200 });
  } catch (err) {
    console.error('GET /api/ppdb/siswa:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal memuat data siswa' },
      { status: 500 }
    );
  }
}

async function postHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const siswa = await ensureSiswaForUser(req.user.userId);
    return NextResponse.json(
      { success: true, data: siswa, message: 'Data siswa berhasil dibuat atau sudah tersedia' },
      { status: 200 }
    );
  } catch (err) {
    console.error('POST /api/ppdb/siswa:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal membuat data siswa' },
      { status: 500 }
    );
  }
}

export const GET = authMiddleware(getHandler);
export const POST = authMiddleware(postHandler, ['user', 'admin']);


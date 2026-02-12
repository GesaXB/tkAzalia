import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth';
import { getSiswaForUser } from '@/lib/ppdb';

async function handler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const siswa = await getSiswaForUser(req.user.userId);
    if (!siswa) {
      return NextResponse.json(
        { success: false, error: 'Data siswa belum tersedia' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: {
          status_ppdb: siswa.status_ppdb ?? 'menunggu',
          catatan_ppdb: siswa.catatan_ppdb ?? null,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('GET /api/ppdb/status:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal memuat status PPDB' },
      { status: 500 }
    );
  }
}

export const GET = authMiddleware(handler, ['user', 'admin']);


import { getPpdbSiswaById } from '@/lib/admin/ppdb';
import { AuthenticatedRequest, authMiddleware } from '@/lib/middleware/auth';
import { ApiResponse } from '@/types';
import { NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{ id: string }>;
}

async function getHandler(
  req: AuthenticatedRequest,
  ...args: unknown[]
): Promise<NextResponse<ApiResponse>> {
  const context = args[0] as RouteContext;
  const id = Number((await context.params).id);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json(
      { success: false, error: 'ID siswa tidak valid' },
      { status: 400 }
    );
  }
  try {
    const data = await getPpdbSiswaById(id);
    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Peserta PPDB tidak ditemukan' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error('GET /api/admin/ppdb/keputusan/[id]:', err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Gagal memuat data',
      },
      { status: 500 }
    );
  }
}

export const GET = authMiddleware(getHandler, ['admin']);

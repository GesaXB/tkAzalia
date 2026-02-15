import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { authMiddleware } from '@/lib/middleware/auth';
import { getPpdbSiswaById } from '@/lib/admin/ppdb';

interface RouteContext {
  params: Promise<{ id: string }>;
}

async function getHandler(
  _req: Request,
  context: RouteContext
): Promise<NextResponse<ApiResponse>> {
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

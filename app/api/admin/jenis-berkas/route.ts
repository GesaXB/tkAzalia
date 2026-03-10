import { createJenisBerkas, listJenisBerkas } from '@/lib/admin/jenis-berkas';
import { AuthenticatedRequest, authMiddleware } from '@/lib/middleware/auth';
import { ApiResponse } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

async function getHandler(): Promise<NextResponse<ApiResponse>> {
  try {
    const data = await listJenisBerkas();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error('GET /api/admin/jenis-berkas:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal memuat jenis berkas' },
      { status: 500 }
    );
  }
}

async function postHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await (req as NextRequest).json();
    if (!body.nama_berkas || typeof body.nama_berkas !== 'string' || !body.nama_berkas.trim()) {
      return NextResponse.json(
        { success: false, error: 'Nama berkas wajib diisi' },
        { status: 400 }
      );
    }
    const data = await createJenisBerkas(body.nama_berkas.trim());
    return NextResponse.json({ success: true, data, message: 'Jenis berkas berhasil ditambah' }, { status: 201 });
  } catch (err) {
    console.error('POST /api/admin/jenis-berkas:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal menambah jenis berkas' },
      { status: 500 }
    );
  }
}

export const GET = authMiddleware(getHandler, ['admin']);
export const POST = authMiddleware(postHandler, ['admin']);

import { createKelas, listKelas } from '@/lib/admin/kelas';
import { AuthenticatedRequest, authMiddleware } from '@/lib/middleware/auth';
import { ApiResponse } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

async function getHandler(): Promise<NextResponse<ApiResponse>> {
  try {
    const data = await listKelas();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error('GET /api/admin/kelas:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal memuat kelas' },
      { status: 500 }
    );
  }
}

interface CreateBody {
  nama: string;
  deskripsi?: string;
  urutan?: number;
  kuota?: number;
}

async function postHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = (await (req as NextRequest).json()) as CreateBody;
    if (!body.nama || typeof body.nama !== 'string' || !body.nama.trim()) {
      return NextResponse.json(
        { success: false, error: 'Nama kelas wajib diisi' },
        { status: 400 }
      );
    }
    const urutan = typeof body.urutan === 'number' ? body.urutan : 0;
    const kuota = typeof body.kuota === 'number' ? body.kuota : 0;
    const data = await createKelas(body.nama.trim(), body.deskripsi || null, urutan, kuota);
    return NextResponse.json({ success: true, data, message: 'Kelas berhasil ditambah' }, { status: 201 });
  } catch (err) {
    console.error('POST /api/admin/kelas:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal menambah kelas' },
      { status: 500 }
    );
  }
}

export const GET = authMiddleware(getHandler, ['admin']);
export const POST = authMiddleware(postHandler, ['admin']);

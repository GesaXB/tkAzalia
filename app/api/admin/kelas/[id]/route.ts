import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth';
import { updateKelas, deleteKelas, getKelasById } from '@/lib/admin/kelas';

interface RouteContext {
  params: Promise<{ id: string }>;
}

async function putHandler(req: AuthenticatedRequest, context: RouteContext): Promise<NextResponse<ApiResponse>> {
  const id = Number((await context.params).id);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ success: false, error: 'ID tidak valid' }, { status: 400 });
  }
  try {
    const body = (await (req as NextRequest).json()) as { nama?: string; urutan?: number };
    const data: { nama?: string; urutan?: number } = {};
    if (typeof body.nama === 'string' && body.nama.trim()) data.nama = body.nama.trim();
    if (typeof body.urutan === 'number') data.urutan = body.urutan;
    if (Object.keys(data).length === 0) {
      return NextResponse.json({ success: false, error: 'Tidak ada data yang diubah' }, { status: 400 });
    }
    const updated = await updateKelas(id, data);
    return NextResponse.json({ success: true, data: updated, message: 'Kelas berhasil diperbarui' }, { status: 200 });
  } catch (err) {
    console.error('PUT /api/admin/kelas/[id]:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal memperbarui kelas' },
      { status: 500 }
    );
  }
}

async function deleteHandler(_req: AuthenticatedRequest, context: RouteContext): Promise<NextResponse<ApiResponse>> {
  const id = Number((await context.params).id);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ success: false, error: 'ID tidak valid' }, { status: 400 });
  }
  try {
    const existing = await getKelasById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Kelas tidak ditemukan' }, { status: 404 });
    }
    await deleteKelas(id);
    return NextResponse.json({ success: true, message: 'Kelas berhasil dihapus' }, { status: 200 });
  } catch (err) {
    console.error('DELETE /api/admin/kelas/[id]:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal menghapus kelas' },
      { status: 500 }
    );
  }
}

export const PUT = authMiddleware(putHandler, ['admin']);
export const DELETE = authMiddleware(deleteHandler, ['admin']);

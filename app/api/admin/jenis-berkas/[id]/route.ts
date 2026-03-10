import { deleteJenisBerkas, getJenisBerkasById, updateJenisBerkas } from '@/lib/admin/jenis-berkas';
import { AuthenticatedRequest, authMiddleware } from '@/lib/middleware/auth';
import { ApiResponse } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

async function putHandler(req: AuthenticatedRequest, context: any): Promise<NextResponse<ApiResponse>> {
  const id = Number((await context.params).id);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ success: false, error: 'ID tidak valid' }, { status: 400 });
  }
  try {
    const body = await (req as NextRequest).json();
    if (!body.nama_berkas || typeof body.nama_berkas !== 'string' || !body.nama_berkas.trim()) {
      return NextResponse.json({ success: false, error: 'Nama berkas wajib diisi' }, { status: 400 });
    }
    const updated = await updateJenisBerkas(id, { nama_berkas: body.nama_berkas.trim() });
    return NextResponse.json({ success: true, data: updated, message: 'Jenis berkas berhasil diperbarui' }, { status: 200 });
  } catch (err) {
    console.error('PUT /api/admin/jenis-berkas/[id]:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal memperbarui jenis berkas' },
      { status: 500 }
    );
  }
}

async function deleteHandler(_req: AuthenticatedRequest, context: any): Promise<NextResponse<ApiResponse>> {
  const id = Number((await context.params).id);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ success: false, error: 'ID tidak valid' }, { status: 400 });
  }
  try {
    const existing = await getJenisBerkasById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Jenis berkas tidak ditemukan' }, { status: 404 });
    }
    await deleteJenisBerkas(id);
    return NextResponse.json({ success: true, message: 'Jenis berkas berhasil dihapus' }, { status: 200 });
  } catch (err) {
    console.error('DELETE /api/admin/jenis-berkas/[id]:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal menghapus jenis berkas' },
      { status: 500 }
    );
  }
}

export const PUT = authMiddleware(putHandler, ['admin']);
export const DELETE = authMiddleware(deleteHandler, ['admin']);

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { ApiResponse } from '@/types';
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth';
import { getSpmbJadwal, upsertSpmbJadwal, resetSpmbJadwal, isSpmbOpen } from '@/lib/spmbSetting';

async function getHandler(): Promise<NextResponse<ApiResponse>> {
  try {
    const jadwal = await getSpmbJadwal();
    const open = jadwal ? isSpmbOpen(jadwal) : false;
    return NextResponse.json(
      { success: true, data: jadwal ? { ...jadwal, dibuka: open } : null },
      { status: 200 }
    );
  } catch (err) {
    console.error('GET /api/admin/ppdb/jadwal:', err);
    return NextResponse.json({ success: false, error: 'Gagal memuat jadwal' }, { status: 500 });
  }
}

async function putHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await (req as NextRequest).json();
    const { tanggal_mulai, tanggal_selesai } = body;

    if (!tanggal_mulai || !tanggal_selesai) {
      return NextResponse.json(
        { success: false, error: 'Tanggal mulai dan selesai harus diisi' },
        { status: 400 }
      );
    }

    const mulai = new Date(tanggal_mulai);
    const selesai = new Date(tanggal_selesai);

    if (isNaN(mulai.getTime()) || isNaN(selesai.getTime())) {
      return NextResponse.json({ success: false, error: 'Format tanggal tidak valid' }, { status: 400 });
    }

    await upsertSpmbJadwal(mulai, selesai);
    revalidatePath('/pendaftaran');

    return NextResponse.json({
      success: true,
      message: 'Jadwal berhasil disimpan',
    });
  } catch (err) {
    console.error('PUT /api/admin/ppdb/jadwal:', err);
    return NextResponse.json({ success: false, error: 'Gagal menyimpan jadwal' }, { status: 500 });
  }
}

async function deleteHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    await resetSpmbJadwal();
    revalidatePath('/pendaftaran');
    return NextResponse.json({ success: true, message: 'Jadwal berhasil dihapus' });
  } catch (err) {
    console.error('DELETE /api/admin/ppdb/jadwal:', err);
    return NextResponse.json({ success: false, error: 'Gagal mereset jadwal' }, { status: 500 });
  }
}

export const GET = authMiddleware(getHandler, ['admin']);
export const PUT = authMiddleware(putHandler, ['admin']);
export const DELETE = authMiddleware(deleteHandler, ['admin']);

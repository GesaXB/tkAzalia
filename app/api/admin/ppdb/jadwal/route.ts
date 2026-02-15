import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth';
import { getPpdbJadwal, upsertPpdbJadwal, resetPpdbJadwal, isPpdbOpen } from '@/lib/ppdbSetting';

async function getHandler(): Promise<NextResponse<ApiResponse>> {
  try {
    const jadwal = await getPpdbJadwal();
    const open = jadwal ? isPpdbOpen(jadwal) : false;
    return NextResponse.json(
      { success: true, data: jadwal ? { ...jadwal, dibuka: open } : null },
      { status: 200 }
    );
  } catch (err) {
    console.error('GET /api/admin/ppdb/jadwal:', err);
    return NextResponse.json(
      { success: false, error: 'Gagal memuat jadwal PPDB' },
      { status: 500 }
    );
  }
}

interface PutBody {
  tanggal_mulai: string;
  tanggal_selesai: string;
}

async function putHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = (await (req as NextRequest).json()) as PutBody;
    const mulai = body.tanggal_mulai ? new Date(body.tanggal_mulai) : null;
    const selesai = body.tanggal_selesai ? new Date(body.tanggal_selesai) : null;
    if (!mulai || !selesai || isNaN(mulai.getTime()) || isNaN(selesai.getTime())) {
      return NextResponse.json(
        { success: false, error: 'Tanggal mulai dan selesai wajib' },
        { status: 400 }
      );
    }
    if (mulai > selesai) {
      return NextResponse.json(
        { success: false, error: 'Tanggal mulai tidak boleh setelah tanggal selesai' },
        { status: 400 }
      );
    }
    const row = await upsertPpdbJadwal(mulai, selesai);
    const jadwal = {
      id: row.id,
      tanggal_mulai: row.tanggal_mulai.toISOString(),
      tanggal_selesai: row.tanggal_selesai.toISOString(),
    };
    return NextResponse.json(
      { success: true, data: jadwal, message: 'Jadwal PPDB berhasil disimpan' },
      { status: 200 }
    );
  } catch (err) {
    console.error('PUT /api/admin/ppdb/jadwal:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal menyimpan jadwal' },
      { status: 500 }
    );
  }
}

async function deleteHandler(): Promise<NextResponse<ApiResponse>> {
  try {
    await resetPpdbJadwal();
    return NextResponse.json(
      { success: true, message: 'Jadwal PPDB berhasil direset' },
      { status: 200 }
    );
  } catch (err) {
    console.error('DELETE /api/admin/ppdb/jadwal:', err);
    return NextResponse.json(
      { success: false, error: 'Gagal mereset jadwal PPDB' },
      { status: 500 }
    );
  }
}

export const GET = authMiddleware(getHandler, ['admin']);
export const PUT = authMiddleware(putHandler, ['admin']);
export const DELETE = authMiddleware(deleteHandler, ['admin']);

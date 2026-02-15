import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { getPpdbJadwal, isPpdbOpen } from '@/lib/ppdbSetting';

export async function GET(): Promise<NextResponse<ApiResponse>> {
  try {
    const jadwal = await getPpdbJadwal();
    const open = jadwal ? isPpdbOpen(jadwal) : false;
    return NextResponse.json(
      {
        success: true,
        data: jadwal ? { ...jadwal, dibuka: open } : null,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('GET /api/ppdb/jadwal:', err);
    return NextResponse.json(
      { success: false, error: 'Gagal memuat jadwal PPDB' },
      { status: 500 }
    );
  }
}

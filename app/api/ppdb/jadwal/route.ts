import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { getSpmbJadwal, isSpmbOpen } from '@/lib/spmbSetting';

export async function GET(): Promise<NextResponse<ApiResponse>> {
  try {
    const jadwal = await getSpmbJadwal();
    const open = jadwal ? isSpmbOpen(jadwal) : false;
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
      { success: false, error: 'Gagal memuat jadwal SPMB' },
      { status: 500 }
    );
  }
}

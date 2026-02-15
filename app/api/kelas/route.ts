import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { listKelas } from '@/lib/admin/kelas';

export async function GET(): Promise<NextResponse<ApiResponse>> {
  try {
    const data = await listKelas();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error('GET /api/kelas:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal memuat kelas' },
      { status: 500 }
    );
  }
}

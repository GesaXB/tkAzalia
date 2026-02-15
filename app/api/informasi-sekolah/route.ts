import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse } from '@/types';

export async function GET(): Promise<NextResponse<ApiResponse>> {
  try {
    const data = await prisma.informasiSekolah.findMany({
      where: {
        deleted_at: null,
        status: 'published',
      },
      orderBy: {
        urutan: 'asc',
      },
    });

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('GET /api/informasi-sekolah:', err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Gagal memuat informasi sekolah',
      },
      { status: 500 }
    );
  }
}


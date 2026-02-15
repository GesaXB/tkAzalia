import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { getInformasiSekolahBySlug } from '@/lib/admin/informasiSekolah';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(
  _req: Request,
  context: RouteContext
): Promise<NextResponse<ApiResponse>> {
  try {
    const { slug } = await context.params;
    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug wajib' },
        { status: 400 }
      );
    }
    const data = await getInformasiSekolahBySlug(slug);
    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Artikel tidak ditemukan' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (err) {
    console.error('GET /api/informasi-sekolah/[slug]:', err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Gagal memuat artikel',
      },
      { status: 500 }
    );
  }
}

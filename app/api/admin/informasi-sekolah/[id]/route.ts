import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth';
import { deleteInformasiSekolah } from '@/lib/admin/informasiSekolah';

interface RouteContext {
  params: Promise<{ id: string }>;
}

async function deleteHandler(
  req: AuthenticatedRequest,
  context: RouteContext
): Promise<NextResponse<ApiResponse>> {
  const id = Number((await context.params).id);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json(
      { success: false, error: 'ID tidak valid' },
      { status: 400 }
    );
  }

  try {
    await deleteInformasiSekolah(id);
    return NextResponse.json(
      { success: true, message: 'Informasi berhasil dihapus' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Informasi tidak ditemukan' },
      { status: 404 }
    );
  }
}

export const DELETE = authMiddleware(deleteHandler, ['admin']);

import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, StatusPpdb } from '@/types';
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth';
import { listPpdbSiswa, updatePpdbStatus } from '@/lib/admin/ppdb';

interface UpdatePpdbBody {
  siswa_id: number;
  status_ppdb: StatusPpdb;
  catatan_ppdb?: string | null;
}

async function getHandler(): Promise<NextResponse<ApiResponse>> {
  try {
    const data = await listPpdbSiswa();
    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('GET /api/admin/ppdb/keputusan:', err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Gagal memuat data PPDB',
      },
      { status: 500 }
    );
  }
}

async function postHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  const body = (await (req as NextRequest).json()) as UpdatePpdbBody;

  if (!body.siswa_id || !body.status_ppdb) {
    return NextResponse.json(
      {
        success: false,
        error: 'Data keputusan PPDB tidak lengkap',
      },
      { status: 400 }
    );
  }

  const updated = await updatePpdbStatus(
    body.siswa_id,
    body.status_ppdb,
    body.catatan_ppdb ?? null
  );

  return NextResponse.json(
    {
      success: true,
      data: updated,
      message: 'Status PPDB berhasil diperbarui',
    },
    { status: 200 }
  );
}

export const GET = authMiddleware(getHandler, ['admin']);
export const POST = authMiddleware(postHandler, ['admin']);


import { updateBerkasValidasi } from '@/lib/admin/ppdb';
import { AuthenticatedRequest, authMiddleware } from '@/lib/middleware/auth';
import { ApiResponse } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

interface ValidateBerkasBody {
  berkas_siswa_id: number;
  status_validasi: 'valid' | 'tidak_valid' | 'menunggu';
  catatan_validasi?: string;
}

async function postHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = (await (req as NextRequest).json()) as ValidateBerkasBody;

    if (!body.berkas_siswa_id || !body.status_validasi) {
      return NextResponse.json(
        {
          success: false,
          error: 'Data validasi berkas tidak lengkap',
        },
        { status: 400 }
      );
    }

    const updated = await updateBerkasValidasi(
      body.berkas_siswa_id,
      body.status_validasi,
      body.catatan_validasi
    );

    return NextResponse.json(
      {
        success: true,
        data: updated,
        message: 'Status validasi berkas berhasil diperbarui',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('POST /api/admin/ppdb/validasi-berkas:', err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Gagal memvalidasi berkas',
      },
      { status: 500 }
    );
  }
}

export const POST = authMiddleware(postHandler, ['admin']);

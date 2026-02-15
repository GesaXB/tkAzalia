import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth';
import { ensureSiswaForUser } from '@/lib/ppdb';
import { checkPpdbOpen } from '@/lib/ppdbSetting';
import path from 'path';
import fs from 'fs';

async function postHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    if (req.user.role !== 'admin') {
      const ppdb = await checkPpdbOpen();
      if (!ppdb.open) {
        return NextResponse.json(
          { success: false, error: ppdb.message || 'PPDB tidak dibuka' },
          { status: 403 }
        );
      }
    }
    const siswa = await ensureSiswaForUser(req.user.userId);
    const formData = await (req as NextRequest).formData();
    const file = formData.get('file') as File | null;

    if (!file || !file.size) {
      return NextResponse.json(
        { success: false, error: 'File tidak ada atau kosong' },
        { status: 400 }
      );
    }

    const dir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const ext = path.extname(file.name) || '';
    const base = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `siswa_${siswa.siswa_id}_${Date.now()}_${base}${ext}`;
    const filepath = path.join(dir, filename);
    const bytes = await file.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(bytes));

    const publicPath = `/uploads/${filename}`;

    return NextResponse.json(
      {
        success: true,
        data: {
          path_file: publicPath,
          nama_file: file.name,
          ukuran_file: Math.ceil(file.size / 1024),
          tipe_file: file.type || 'application/octet-stream',
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('POST /api/ppdb/upload:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal mengunggah file' },
      { status: 500 }
    );
  }
}

export const POST = authMiddleware(postHandler, ['user', 'admin']);

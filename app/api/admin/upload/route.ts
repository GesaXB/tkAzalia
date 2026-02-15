import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth';
import path from 'path';
import fs from 'fs';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

async function postHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const formData = await (req as NextRequest).formData();
    const file = formData.get('file') as File | null;

    if (!file || !file.size) {
      return NextResponse.json(
        { success: false, error: 'File tidak ada atau kosong' },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Hanya file gambar (JPEG, PNG, GIF, WebP) yang diizinkan' },
        { status: 400 }
      );
    }

    const dir = path.join(process.cwd(), 'public', 'uploads', 'blog');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const ext = path.extname(file.name) || '.jpg';
    const base = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `blog_${Date.now()}_${base}${ext}`;
    const filepath = path.join(dir, filename);
    const bytes = await file.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(bytes));

    const publicPath = `/uploads/blog/${filename}`;

    return NextResponse.json(
      {
        success: true,
        data: { url: publicPath },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('POST /api/admin/upload:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal mengunggah file' },
      { status: 500 }
    );
  }
}

export const POST = authMiddleware(postHandler, ['admin']);

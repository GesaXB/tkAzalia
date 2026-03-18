import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth';
import { ensureSiswaForUser } from '@/lib/ppdb';
import { checkSpmbOpen } from '@/lib/spmbSetting';
import path from 'path';
import fs from 'fs';

async function postHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    if (req.user.role !== 'admin') {
      const spmbStatus = await checkSpmbOpen();
    if (!spmbStatus.open) {
      return NextResponse.json(
        { success: false, error: spmbStatus.message || 'Pendaftaran SPMB sedang ditutup.' },
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

    const { supabase } = await import('@/lib/supabase');
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || '';
    const base = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `siswa_${siswa.siswa_id}_${Date.now()}_${base}${ext}`;
    const filePath = `ppdb/${filename}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('tkazalia')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('tkazalia')
      .getPublicUrl(filePath);

    return NextResponse.json(
      {
        success: true,
        data: {
          path_file: publicUrl,
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

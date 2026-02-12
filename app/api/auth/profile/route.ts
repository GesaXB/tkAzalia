import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse } from '@/types';
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth';

async function getHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  const user = await prisma.user.findUnique({
    where: {
      user_id: req.user.userId,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        error: 'Pengguna tidak ditemukan',
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      data: {
        user_id: user.user_id,
        username: user.username,
        role: user.role,
        nama_lengkap: user.nama_lengkap,
        email: user.email,
        no_telp: user.no_telp,
      },
    },
    { status: 200 }
  );
}

interface UpdateProfileBody {
  nama_lengkap?: string;
  email?: string;
  no_telp?: string;
}

async function putHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = (await (req as NextRequest).json()) as UpdateProfileBody;
    const data: { nama_lengkap?: string; email?: string; no_telp?: string } = {};
    if (typeof body.nama_lengkap === 'string' && body.nama_lengkap.trim()) {
      data.nama_lengkap = body.nama_lengkap.trim();
    }
    if (typeof body.email === 'string' && body.email.trim()) {
      data.email = body.email.trim();
    }
    if (typeof body.no_telp === 'string' && body.no_telp.trim()) {
      data.no_telp = body.no_telp.trim();
    }
    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Tidak ada data yang diubah' },
        { status: 400 }
      );
    }
    const user = await prisma.user.update({
      where: { user_id: req.user.userId },
      data,
    });
    return NextResponse.json(
      {
        success: true,
        data: {
          user_id: user.user_id,
          username: user.username,
          role: user.role,
          nama_lengkap: user.nama_lengkap,
          email: user.email,
          no_telp: user.no_telp,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('PUT /api/auth/profile:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Gagal memperbarui profil' },
      { status: 500 }
    );
  }
}

export const GET = authMiddleware(getHandler);
export const PUT = authMiddleware(putHandler);


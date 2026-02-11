import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ApiResponse } from '@/types';
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth';

async function handler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
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

export const GET = authMiddleware(handler);


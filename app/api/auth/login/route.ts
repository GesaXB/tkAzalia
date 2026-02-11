import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AuthService } from '@/lib/auth';
import { ApiResponse, LoginData } from '@/types';

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = (await req.json()) as LoginData;

    if (!body.username || !body.password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Username dan password wajib diisi',
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Username atau password salah',
        },
        { status: 401 }
      );
    }

    const isPasswordValid = await AuthService.verifyPassword(
      body.password,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Username atau password salah',
        },
        { status: 401 }
      );
    }

    const token = AuthService.generateToken({
      userId: user.user_id,
      username: user.username,
      role: user.role,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          token,
          user: {
            user_id: user.user_id,
            username: user.username,
            role: user.role,
            nama_lengkap: user.nama_lengkap,
            email: user.email,
            no_telp: user.no_telp,
          },
        },
        message: 'Login berhasil',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Terjadi kesalahan pada server',
      },
      { status: 500 }
    );
  }
}


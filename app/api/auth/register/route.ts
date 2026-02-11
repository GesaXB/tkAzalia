import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AuthService } from '@/lib/auth';
import { ApiResponse, RegisterData } from '@/types';

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = (await req.json()) as RegisterData;

    if (
      !body.username ||
      !body.password ||
      !body.nama_lengkap ||
      !body.email ||
      !body.no_telepon
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Data registrasi tidak lengkap',
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: body.username },
          { email: body.email },
          { no_telp: body.no_telepon },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'Username, email, atau nomor telepon sudah digunakan',
        },
        { status: 409 }
      );
    }

    const hashedPassword = await AuthService.hashPassword(body.password);

    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: hashedPassword,
        role: 'user',
        nama_lengkap: body.nama_lengkap,
        email: body.email,
        no_telp: body.no_telepon,
      },
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
        message: 'Registrasi berhasil',
      },
      { status: 201 }
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


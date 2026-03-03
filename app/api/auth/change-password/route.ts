import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/types";
import { authMiddleware, AuthenticatedRequest } from "@/lib/middleware/auth";
import { AuthService } from "@/lib/auth";

interface ChangePasswordBody {
  password_lama: string;
  password_baru: string;
}

async function postHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = (await (req as NextRequest).json()) as ChangePasswordBody;
    const { password_lama, password_baru } = body;

    if (!password_lama || !password_baru) {
      return NextResponse.json(
        { success: false, error: "Password lama dan password baru wajib diisi" },
        { status: 400 }
      );
    }

    if (password_baru.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password baru minimal 6 karakter" },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { user_id: req.user.userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Pengguna tidak ditemukan" },
        { status: 404 }
      );
    }

    // Verify old password
    const isPasswordValid = await AuthService.verifyPassword(password_lama, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Password lama tidak sesuai" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await AuthService.hashPassword(password_baru);

    // Update password
    await prisma.user.update({
      where: { user_id: req.user.userId },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { success: true, data: { message: "Password berhasil diubah" } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan saat mengubah password" },
      { status: 500 }
    );
  }
}

export const POST = authMiddleware(postHandler);

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/types";
import { authMiddleware, AuthenticatedRequest } from "@/lib/middleware/auth";
import { AuthService } from "@/lib/auth";

async function putHandler(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse>> {
  try {
    // Ensure the requester is an admin
    if (req.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Akses ditolak" },
        { status: 403 }
      );
    }

    const userId = Number(params.id);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "ID Pengguna tidak valid" },
        { status: 400 }
      );
    }

    const body = await (req as NextRequest).json();
    const { password_baru } = body;

    if (!password_baru || password_baru.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password baru minimal 6 karakter" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Pengguna tidak ditemukan" },
        { status: 404 }
      );
    }

    // Hash new password
    const hashedPassword = await AuthService.hashPassword(password_baru);

    // Update user password
    await prisma.user.update({
      where: { user_id: userId },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { success: true, data: { message: "Password berhasil direset" } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset user password error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan saat mereset password" },
      { status: 500 }
    );
  }
}

export const PUT = authMiddleware(putHandler as any);

import { prisma } from "@/lib/prisma";
import { authMiddleware, AuthenticatedRequest } from "@/lib/middleware/auth";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types";

async function deleteHandler(
  req: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse>> {
  try {
    const { id } = await params;
    const komentarId = parseInt(id);
    
    if (isNaN(komentarId)) {
      return NextResponse.json({ success: false, error: "ID tidak valid" }, { status: 400 });
    }

    await prisma.komentar.delete({
      where: { komentar_id: komentarId },
    });

    return NextResponse.json({ success: true, message: "Komentar berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ success: false, error: "Gagal menghapus komentar" }, { status: 500 });
  }
}

export const DELETE = authMiddleware(deleteHandler, ["admin"]);

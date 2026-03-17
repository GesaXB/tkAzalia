import { prisma } from "@/lib/prisma";
import { authMiddleware, AuthenticatedRequest } from "@/lib/middleware/auth";
import { NextResponse } from "next/server";

// PATCH: Update comment (Owner only)
export const PATCH = authMiddleware(async (req: AuthenticatedRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const komentarId = parseInt(id);
    if (isNaN(komentarId)) {
      return NextResponse.json({ success: false, message: "ID tidak valid" }, { status: 400 });
    }

    const { isi } = await req.json();
    if (!isi) {
      return NextResponse.json({ success: false, message: "Isi komentar tidak boleh kosong" }, { status: 400 });
    }

    const comment = await prisma.komentar.findUnique({
      where: { komentar_id: komentarId }
    });

    if (!comment) {
      return NextResponse.json({ success: false, message: "Komentar tidak ditemukan" }, { status: 404 });
    }

    // Check ownership
    if (comment.user_id !== req.user.userId) {
      return NextResponse.json({ success: false, message: "Bukan pemilik komentar" }, { status: 403 });
    }

    const updated = await prisma.komentar.update({
      where: { komentar_id: komentarId },
      data: { isi }
    });

    return NextResponse.json({ success: true, data: updated, message: "Komentar berhasil diubah" });
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json({ success: false, message: "Gagal mengubah komentar" }, { status: 500 });
  }
}, ['admin', 'user']);

// DELETE: Delete comment (Owner or Admin)
export const DELETE = authMiddleware(async (req: AuthenticatedRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const komentarId = parseInt(id);
    if (isNaN(komentarId)) {
      return NextResponse.json({ success: false, message: "ID tidak valid" }, { status: 400 });
    }

    const comment = await prisma.komentar.findUnique({
      where: { komentar_id: komentarId }
    });

    if (!comment) {
      return NextResponse.json({ success: false, message: "Komentar tidak ditemukan" }, { status: 404 });
    }

    // Check ownership or admin
    if (comment.user_id !== req.user.userId && req.user.role !== 'admin') {
      return NextResponse.json({ success: false, message: "Tidak memiliki akses" }, { status: 403 });
    }

    await prisma.komentar.delete({
      where: { komentar_id: komentarId }
    });

    return NextResponse.json({ success: true, message: "Komentar berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ success: false, message: "Gagal menghapus komentar" }, { status: 500 });
  }
}, ['admin', 'user']);

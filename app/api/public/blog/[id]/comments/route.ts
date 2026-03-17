import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware, AuthenticatedRequest } from "@/lib/middleware/auth";

// GET: Fetch comments for a specific post
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const infoId = parseInt(id);
    if (isNaN(infoId)) {
      return NextResponse.json({ success: false, message: "ID tidak valid" }, { status: 400 });
    }

    const komentar = await prisma.komentar.findMany({
      where: { info_id: infoId },
      include: {
        user: {
          select: {
            user_id: true,
            nama_lengkap: true,
            role: true
          }
        }
      },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json({ success: true, data: komentar });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil komentar" }, { status: 500 });
  }
}

// POST: Add a new comment (Login required)
export const POST = authMiddleware(async (authenticatedReq: AuthenticatedRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const infoId = parseInt(id);
    if (isNaN(infoId)) {
      return NextResponse.json({ success: false, message: "ID tidak valid" }, { status: 400 });
    }

    const body = await authenticatedReq.json();
    const { isi } = body;
    const userPayload = authenticatedReq.user;

    if (!isi) {
      return NextResponse.json({ success: false, message: "Isi komentar wajib diisi" }, { status: 400 });
    }

    const newKomentar = await prisma.komentar.create({
      data: {
        info_id: infoId,
        user_id: userPayload.userId,
        nama: userPayload.nama_lengkap as string || userPayload.username, // Fallback to username
        isi,
      },
    });

    return NextResponse.json({ success: true, data: newKomentar, message: "Komentar berhasil ditambahkan" });
  } catch (error) {
    console.error("Error posting comment:", error);
    return NextResponse.json({ success: false, message: "Gagal mengirim komentar" }, { status: 500 });
  }
}, ['admin', 'user']);

// PATCH: Update comment (Owner only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Extract comment ID from URL if needed or from body. 
  // Based on current structure /api/public/blog/[id]/comments, 
  // maybe it's better to have /api/public/comments/[commentId] for PATCH/DELETE
}

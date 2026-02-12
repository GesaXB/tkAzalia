import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth';
import {
  createInformasiSekolah,
  listInformasiSekolah,
  updateInformasiSekolah,
  InformasiSekolahInput,
} from '@/lib/admin/informasiSekolah';
import { Tipe, Status } from '../../../../generated/prisma/enums';

const TIPE_VALUES = Object.values(Tipe) as string[];
const STATUS_VALUES = Object.values(Status) as string[];

function normalizeInput(raw: Record<string, unknown>): InformasiSekolahInput | null {
  if (
    typeof raw.judul !== 'string' ||
    typeof raw.slug !== 'string' ||
    typeof raw.konten !== 'string' ||
    !TIPE_VALUES.includes(String(raw.tipe)) ||
    !STATUS_VALUES.includes(String(raw.status))
  ) {
    return null;
  }
  const urutan = Number(raw.urutan);
  if (!Number.isInteger(urutan) || urutan < 0) {
    return null;
  }
  return {
    judul: raw.judul,
    slug: raw.slug,
    konten: raw.konten,
    tipe: raw.tipe as InformasiSekolahInput['tipe'],
    status: raw.status as InformasiSekolahInput['status'],
    urutan,
  };
}

interface UpdateBody {
  info_id: number;
  data: Record<string, unknown>;
}

async function getHandler(): Promise<NextResponse<ApiResponse>> {
  const data = await listInformasiSekolah();

  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status: 200 }
  );
}

async function postHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  const raw = (await (req as NextRequest).json()) as Record<string, unknown>;
  const body = normalizeInput(raw);

  if (!body) {
    return NextResponse.json(
      {
        success: false,
        error: 'Data informasi sekolah tidak lengkap atau tipe/status/urutan tidak valid',
      },
      { status: 400 }
    );
  }

  const data = await createInformasiSekolah(body);

  return NextResponse.json(
    {
      success: true,
      data,
      message: 'Informasi sekolah berhasil dibuat',
    },
    { status: 201 }
  );
}

async function putHandler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  const body = (await (req as NextRequest).json()) as UpdateBody;

  const infoId = typeof body.info_id === 'number' ? body.info_id : Number(body.info_id);
  if (!body.data || !Number.isInteger(infoId) || infoId < 1) {
    return NextResponse.json(
      {
        success: false,
        error: 'info_id dan data wajib',
      },
      { status: 400 }
    );
  }

  const normalized = normalizeInput(body.data as Record<string, unknown>);
  if (!normalized) {
    return NextResponse.json(
      {
        success: false,
        error: 'Data informasi tidak valid (judul, slug, konten, tipe, status, urutan)',
      },
      { status: 400 }
    );
  }

  const data = await updateInformasiSekolah(infoId, normalized);

  return NextResponse.json(
    {
      success: true,
      data,
      message: 'Informasi sekolah berhasil diperbarui',
    },
    { status: 200 }
  );
}

export const GET = authMiddleware(getHandler, ['admin']);
export const POST = authMiddleware(postHandler, ['admin']);
export const PUT = authMiddleware(putHandler, ['admin']);


import { prisma } from '@/lib/prisma';
import { Tipe, Status } from '../../../generated/prisma/enums';

export interface InformasiSekolahInput {
  judul: string;
  slug: string;
  konten: string;
  ringkasan?: string | null;
  gambar?: string | null;
  tipe: Tipe;
  status: Status;
  urutan: number;
}

export async function listInformasiSekolah() {
  const data = await prisma.informasiSekolah.findMany({
    orderBy: {
      urutan: 'asc',
    },
  });

  return data;
}

export async function getInformasiSekolahBySlug(slug: string) {
  const data = await prisma.informasiSekolah.findFirst({
    where: {
      slug,
      deleted_at: null,
      status: 'published',
    },
  });

  return data;
}

export async function createInformasiSekolah(input: InformasiSekolahInput) {
  const data = await prisma.informasiSekolah.create({
    data: input,
  });

  return data;
}

export async function updateInformasiSekolah(id: number, input: InformasiSekolahInput) {
  const data = await prisma.informasiSekolah.update({
    where: {
      info_id: id,
    },
    data: input,
  });

  return data;
}

export async function deleteInformasiSekolah(id: number) {
  await prisma.informasiSekolah.delete({
    where: { info_id: id },
  });
}


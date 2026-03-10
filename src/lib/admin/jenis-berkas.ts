import { prisma } from '@/lib/prisma';

export async function listJenisBerkas() {
  return prisma.jenisBerkas.findMany({
    orderBy: { jenis_berkas_id: 'asc' },
  });
}

export async function getJenisBerkasById(id: number) {
  return prisma.jenisBerkas.findUnique({
    where: { jenis_berkas_id: id },
  });
}

export async function createJenisBerkas(nama: string) {
  return prisma.jenisBerkas.create({
    data: { nama_berkas: nama },
  });
}

export async function updateJenisBerkas(id: number, data: { nama_berkas?: string }) {
  return prisma.jenisBerkas.update({
    where: { jenis_berkas_id: id },
    data,
  });
}

export async function deleteJenisBerkas(id: number) {
  return prisma.jenisBerkas.delete({
    where: { jenis_berkas_id: id },
  });
}

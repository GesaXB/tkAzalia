import { prisma } from '@/lib/prisma';

export async function listKelas() {
  return prisma.kelas.findMany({
    orderBy: { urutan: 'asc' },
  });
}

export async function createKelas(nama: string, urutan: number) {
  return prisma.kelas.create({
    data: { nama: nama.trim(), urutan },
  });
}

export async function updateKelas(kelasId: number, data: { nama?: string; urutan?: number }) {
  return prisma.kelas.update({
    where: { kelas_id: kelasId },
    data,
  });
}

export async function deleteKelas(kelasId: number) {
  await prisma.siswa.updateMany({ where: { kelas_id: kelasId }, data: { kelas_id: null } });
  await prisma.kelas.delete({ where: { kelas_id: kelasId } });
}

export async function getKelasById(kelasId: number) {
  return prisma.kelas.findUnique({
    where: { kelas_id: kelasId },
  });
}

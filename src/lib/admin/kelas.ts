import { prisma } from '@/lib/prisma';

export async function listKelas() {
  return prisma.kelas.findMany({
    orderBy: { urutan: 'asc' },
  });
}

export async function createKelas(nama: string, deskripsi: string | null, urutan: number) {
  return prisma.kelas.create({
    data: { nama: nama.trim(), deskripsi: deskripsi?.trim() || null, urutan },
  });
}

export async function updateKelas(kelasId: number, data: { nama?: string; deskripsi?: string | null; urutan?: number }) {
  if (data.nama) data.nama = data.nama.trim();
  if (data.deskripsi !== undefined) data.deskripsi = data.deskripsi?.trim() || null;
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

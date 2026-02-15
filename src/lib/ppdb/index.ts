import { prisma } from '@/lib/prisma';
import { StatusValidasi } from '../../../generated/prisma/enums';

export interface CreateBerkasInput {
  siswaId: number;
  jenisBerkasId: number;
  namaFile: string;
  namaFileHash: string;
  pathFile: string;
  ukuranFile: number;
  tipeFile: string;
}

export async function ensureSiswaForUser(userId: number) {
  const existing = await prisma.siswa.findUnique({
    where: {
      user_id: userId,
    },
  });

  if (existing) {
    return existing;
  }

  const siswa = await prisma.siswa.create({
    data: {
      user_id: userId,
    },
  });

  return siswa;
}

export async function getSiswaForUser(userId: number) {
  const siswa = await prisma.siswa.findUnique({
    where: {
      user_id: userId,
    },
    include: {
      user: true,
    },
  });

  return siswa;
}

export async function listSiswaWithUser() {
  const siswa = await prisma.siswa.findMany({
    include: {
      user: true,
    },
    orderBy: {
      siswa_id: 'asc',
    },
  });

  return siswa;
}

export async function listBerkasForSiswa(siswaId: number) {
  const berkas = await prisma.berkasSiswa.findMany({
    where: {
      siswa_id: siswaId,
    },
    include: {
      jenisBerkas: true,
    },
    orderBy: {
      berkas_siswa_id: 'asc',
    },
  });

  return berkas;
}

export async function getBerkasById(berkasSiswaId: number) {
  return prisma.berkasSiswa.findUnique({
    where: { berkas_siswa_id: berkasSiswaId },
    include: { jenisBerkas: true },
  });
}

export async function listJenisBerkas() {
  return prisma.jenisBerkas.findMany({
    orderBy: { jenis_berkas_id: 'asc' },
  });
}

export async function createBerkasSiswa(input: CreateBerkasInput) {
  const berkas = await prisma.berkasSiswa.upsert({
    where: {
      siswa_id_jenis_berkas_id: {
        siswa_id: input.siswaId,
        jenis_berkas_id: input.jenisBerkasId,
      },
    },
    create: {
      siswa_id: input.siswaId,
      jenis_berkas_id: input.jenisBerkasId,
      nama_file: input.namaFile,
      nama_file_hash: input.namaFileHash,
      path_file: input.pathFile,
      ukuran_file: input.ukuranFile,
      tipe_file: input.tipeFile,
      status_validasi: StatusValidasi.menunggu,
      catatan_validasi: '',
    },
    update: {
      nama_file: input.namaFile,
      nama_file_hash: input.namaFileHash,
      path_file: input.pathFile,
      ukuran_file: input.ukuranFile,
      tipe_file: input.tipeFile,
    },
  });

  return berkas;
}

export async function updateBerkasSiswa(
  berkasSiswaId: number,
  data: { nama_file?: string; path_file?: string; ukuran_file?: number; tipe_file?: string }
) {
  return prisma.berkasSiswa.update({
    where: { berkas_siswa_id: berkasSiswaId },
    data,
    include: { jenisBerkas: true },
  });
}export async function deleteBerkasSiswa(berkasSiswaId: number) {
  await prisma.berkasSiswa.delete({
    where: { berkas_siswa_id: berkasSiswaId },
  });
}
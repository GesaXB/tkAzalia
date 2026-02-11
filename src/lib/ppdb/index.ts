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

export async function createBerkasSiswa(input: CreateBerkasInput) {
  const berkas = await prisma.berkasSiswa.create({
    data: {
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
  });

  return berkas;
}


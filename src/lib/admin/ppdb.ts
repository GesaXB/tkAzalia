import { prisma } from '@/lib/prisma';
import { StatusPpdb } from '@/types';

export async function listPpdbSiswa() {
  const siswa = await prisma.siswa.findMany({
    include: {
      user: true,
      kelas: true,
      berkas: {
        include: {
          jenisBerkas: true,
        },
      },
    },
    orderBy: {
      siswa_id: 'asc',
    },
  });

  return siswa;
}

export async function getPpdbSiswaById(siswaId: number) {
  const siswa = await prisma.siswa.findUnique({
    where: { siswa_id: siswaId },
    include: {
      user: true,
      kelas: true,
      berkas: {
        include: {
          jenisBerkas: true,
        },
      },
    },
  });
  return siswa;
}

export async function updatePpdbStatus(
  siswaId: number,
  status: StatusPpdb,
  catatan: string | null
) {
  const updated = await prisma.siswa.update({
    where: {
      siswa_id: siswaId,
    },
    data: {
      status_ppdb: status,
      catatan_ppdb: catatan,
    } as any,
  });

  return updated;
}


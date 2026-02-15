import { prisma } from '@/lib/prisma';

export interface PpdbJadwal {
  id: number;
  tanggal_mulai: string;
  tanggal_selesai: string;
}

export async function getPpdbJadwal() {
  const row = await prisma.ppdbSetting.findFirst({
    orderBy: { id: 'desc' },
  });
  if (!row) return null;
  return {
    id: row.id,
    tanggal_mulai: row.tanggal_mulai.toISOString(),
    tanggal_selesai: row.tanggal_selesai.toISOString(),
  };
}

export function isPpdbOpen(jadwal: PpdbJadwal | null): boolean {
  if (!jadwal) return false;
  const now = new Date();
  const mulai = new Date(jadwal.tanggal_mulai);
  const selesai = new Date(jadwal.tanggal_selesai);
  return now >= mulai && now <= selesai;
}

export async function checkPpdbOpen(): Promise<{ open: boolean; message?: string }> {
  const jadwal = await getPpdbJadwal();
  if (!jadwal) {
    return { open: false, message: 'Jadwal PPDB belum diatur. Hubungi admin.' };
  }
  const now = new Date();
  const mulai = new Date(jadwal.tanggal_mulai);
  const selesai = new Date(jadwal.tanggal_selesai);
  if (now < mulai) {
    return { open: false, message: `Pendaftaran belum dibuka. Dibuka pada ${mulai.toLocaleDateString('id-ID')}.` };
  }
  if (now > selesai) {
    return { open: false, message: 'Periode pendaftaran PPDB telah berakhir.' };
  }
  return { open: true };
}

export async function upsertPpdbJadwal(tanggalMulai: Date, tanggalSelesai: Date) {
  const existing = await prisma.ppdbSetting.findFirst({ orderBy: { id: 'desc' } });
  if (existing) {
    return prisma.ppdbSetting.update({
      where: { id: existing.id },
      data: { tanggal_mulai: tanggalMulai, tanggal_selesai: tanggalSelesai },
    });
  }
  return prisma.ppdbSetting.create({
    data: { tanggal_mulai: tanggalMulai, tanggal_selesai: tanggalSelesai },
  });
}

export async function resetPpdbJadwal() {
  await prisma.ppdbSetting.deleteMany({});
}

import PendaftaranSection from "@/Components/sections/PendaftaranPage";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  const [jenisBerkas, jadwalPpdb] = await Promise.all([
    prisma.jenisBerkas.findMany({ select: { nama_berkas: true } }),
    prisma.ppdbSetting.findFirst()
  ]);

  const dokumenList = jenisBerkas.map(b => b.nama_berkas);

  let jadwalData = null;
  if (jadwalPpdb) {
    jadwalData = {
      tanggal_mulai: jadwalPpdb.tanggal_mulai.toISOString(),
      tanggal_selesai: jadwalPpdb.tanggal_selesai.toISOString()
    };
  }

  return <PendaftaranSection dokumen={dokumenList} jadwal={jadwalData} />;
}
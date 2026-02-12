-- DropUniqueIndex
DROP INDEX IF EXISTS "BerkasSiswa_siswa_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "BerkasSiswa_siswa_id_jenis_berkas_id_key" ON "BerkasSiswa"("siswa_id", "jenis_berkas_id");

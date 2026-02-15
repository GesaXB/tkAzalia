-- CreateTable
CREATE TABLE "Kelas" (
    "kelas_id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Kelas_pkey" PRIMARY KEY ("kelas_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kelas_nama_key" ON "Kelas"("nama");

-- AlterTable
ALTER TABLE "Siswa" ADD COLUMN "kelas_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Siswa" ADD CONSTRAINT "Siswa_kelas_id_fkey" FOREIGN KEY ("kelas_id") REFERENCES "Kelas"("kelas_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Seed default kelas
INSERT INTO "Kelas" ("nama", "urutan") VALUES ('Kelompok A (Usia 4-5 Tahun)', 1), ('Kelompok B (Usia 5-6 Tahun)', 2);

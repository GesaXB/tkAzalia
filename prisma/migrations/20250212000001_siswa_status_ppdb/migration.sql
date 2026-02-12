-- CreateEnum
CREATE TYPE "StatusPpdb" AS ENUM ('menunggu', 'lulus', 'tidak_lulus');

-- AlterTable
ALTER TABLE "Siswa" ADD COLUMN IF NOT EXISTS "status_ppdb" "StatusPpdb" NOT NULL DEFAULT 'menunggu';
ALTER TABLE "Siswa" ADD COLUMN IF NOT EXISTS "catatan_ppdb" TEXT;

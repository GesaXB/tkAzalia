-- AlterEnum
ALTER TYPE "StatusPpdb" ADD VALUE 'belum';

-- AlterTable
ALTER TABLE "Siswa" ALTER COLUMN "status_ppdb" SET DEFAULT 'belum';

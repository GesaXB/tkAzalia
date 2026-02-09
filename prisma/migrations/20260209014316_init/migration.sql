-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "StatusValidasi" AS ENUM ('menunggu', 'valid', 'tidak_valid');

-- CreateEnum
CREATE TYPE "Tipe" AS ENUM ('profil', 'visi', 'misi', 'fasilitas', 'kontak', 'syarat_pendaftaran');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('draft', 'published');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "nama_lengkap" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "no_telp" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Siswa" (
    "siswa_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Siswa_pkey" PRIMARY KEY ("siswa_id")
);

-- CreateTable
CREATE TABLE "BerkasSiswa" (
    "berkas_siswa_id" SERIAL NOT NULL,
    "siswa_id" INTEGER NOT NULL,
    "jenis_berkas_id" INTEGER NOT NULL,
    "nama_file" TEXT NOT NULL,
    "nama_file_hash" TEXT NOT NULL,
    "path_file" TEXT NOT NULL,
    "ukuran_file" INTEGER NOT NULL,
    "tipe_file" TEXT NOT NULL,
    "status_validasi" "StatusValidasi" NOT NULL,
    "catatan_validasi" TEXT NOT NULL,
    "tanggal_unggah" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BerkasSiswa_pkey" PRIMARY KEY ("berkas_siswa_id")
);

-- CreateTable
CREATE TABLE "JenisBerkas" (
    "jenis_berkas_id" SERIAL NOT NULL,
    "nama_berkas" TEXT NOT NULL,

    CONSTRAINT "JenisBerkas_pkey" PRIMARY KEY ("jenis_berkas_id")
);

-- CreateTable
CREATE TABLE "InformasiSekolah" (
    "info_id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "tipe" "Tipe" NOT NULL,
    "status" "Status" NOT NULL,
    "urutan" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uptadet_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "InformasiSekolah_pkey" PRIMARY KEY ("info_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_no_telp_key" ON "User"("no_telp");

-- CreateIndex
CREATE UNIQUE INDEX "Siswa_user_id_key" ON "Siswa"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "BerkasSiswa_siswa_id_key" ON "BerkasSiswa"("siswa_id");

-- CreateIndex
CREATE UNIQUE INDEX "JenisBerkas_nama_berkas_key" ON "JenisBerkas"("nama_berkas");

-- AddForeignKey
ALTER TABLE "Siswa" ADD CONSTRAINT "Siswa_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BerkasSiswa" ADD CONSTRAINT "BerkasSiswa_jenis_berkas_id_fkey" FOREIGN KEY ("jenis_berkas_id") REFERENCES "JenisBerkas"("jenis_berkas_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BerkasSiswa" ADD CONSTRAINT "BerkasSiswa_siswa_id_fkey" FOREIGN KEY ("siswa_id") REFERENCES "Siswa"("siswa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

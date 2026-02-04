-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('L', 'P');

-- CreateEnum
CREATE TYPE "StatusPendaftaran" AS ENUM ('menunggu', 'diproses', 'diterima', 'ditolak');

-- CreateEnum
CREATE TYPE "TipeInformasi" AS ENUM ('profil', 'visi_misi', 'fasilitas', 'pengumuman', 'kontak', 'syarat_pendaftaran');

-- CreateEnum
CREATE TYPE "StatusInfo" AS ENUM ('draft', 'published');

-- CreateEnum
CREATE TYPE "JenisBerkas" AS ENUM ('akta_kelahiran', 'kartu_keluarga', 'ktp_orangtua', 'pas_foto', 'surat_kesehatan', 'ijazah_paud', 'lainnya');

-- CreateEnum
CREATE TYPE "StatusValidasi" AS ENUM ('menunggu', 'valid', 'tidak_valid', 'revisi');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "nama_lengkap" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "no_telepon" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Siswa" (
    "siswa_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "nama_lengkap" VARCHAR(100) NOT NULL,
    "tempat_lahir" VARCHAR(50) NOT NULL,
    "tanggal_lahir" TIMESTAMP(3) NOT NULL,
    "jenis_kelamin" "JenisKelamin" NOT NULL,
    "alamat" TEXT NOT NULL,
    "nama_orangtua" VARCHAR(100) NOT NULL,
    "no_telepon_orangtua" VARCHAR(15) NOT NULL,
    "status_pendaftaran" "StatusPendaftaran" NOT NULL DEFAULT 'menunggu',
    "tanggal_daftar" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "keterangan" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Siswa_pkey" PRIMARY KEY ("siswa_id")
);

-- CreateTable
CREATE TABLE "BerkasSiswa" (
    "berkas_id" SERIAL NOT NULL,
    "siswa_id" INTEGER NOT NULL,
    "jenis_berkas" "JenisBerkas" NOT NULL,
    "nama_file" VARCHAR(255) NOT NULL,
    "nama_asli" VARCHAR(255) NOT NULL,
    "path_file" VARCHAR(500) NOT NULL,
    "ukuran" INTEGER NOT NULL,
    "tipe_file" VARCHAR(50) NOT NULL,
    "status_validasi" "StatusValidasi" NOT NULL DEFAULT 'menunggu',
    "keterangan" TEXT,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validated_at" TIMESTAMP(3),
    "validated_by" INTEGER,

    CONSTRAINT "BerkasSiswa_pkey" PRIMARY KEY ("berkas_id")
);

-- CreateTable
CREATE TABLE "LogAktivitas" (
    "log_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "aksi" VARCHAR(100) NOT NULL,
    "deskripsi" TEXT,
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogAktivitas_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "InformasiSekolah" (
    "info_id" SERIAL NOT NULL,
    "judul" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(200) NOT NULL,
    "konten" TEXT NOT NULL,
    "tipe" "TipeInformasi" NOT NULL,
    "status" "StatusInfo" NOT NULL DEFAULT 'published',
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" INTEGER,

    CONSTRAINT "InformasiSekolah_pkey" PRIMARY KEY ("info_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Siswa_user_id_idx" ON "Siswa"("user_id");

-- CreateIndex
CREATE INDEX "Siswa_status_pendaftaran_idx" ON "Siswa"("status_pendaftaran");

-- CreateIndex
CREATE INDEX "BerkasSiswa_siswa_id_idx" ON "BerkasSiswa"("siswa_id");

-- CreateIndex
CREATE INDEX "BerkasSiswa_jenis_berkas_idx" ON "BerkasSiswa"("jenis_berkas");

-- CreateIndex
CREATE INDEX "BerkasSiswa_status_validasi_idx" ON "BerkasSiswa"("status_validasi");

-- CreateIndex
CREATE UNIQUE INDEX "BerkasSiswa_siswa_id_jenis_berkas_key" ON "BerkasSiswa"("siswa_id", "jenis_berkas");

-- CreateIndex
CREATE INDEX "LogAktivitas_user_id_idx" ON "LogAktivitas"("user_id");

-- CreateIndex
CREATE INDEX "LogAktivitas_created_at_idx" ON "LogAktivitas"("created_at");

-- CreateIndex
CREATE INDEX "InformasiSekolah_tipe_idx" ON "InformasiSekolah"("tipe");

-- CreateIndex
CREATE INDEX "InformasiSekolah_status_idx" ON "InformasiSekolah"("status");

-- CreateIndex
CREATE INDEX "InformasiSekolah_urutan_idx" ON "InformasiSekolah"("urutan");

-- CreateIndex
CREATE UNIQUE INDEX "InformasiSekolah_slug_key" ON "InformasiSekolah"("slug");

-- AddForeignKey
ALTER TABLE "Siswa" ADD CONSTRAINT "Siswa_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BerkasSiswa" ADD CONSTRAINT "BerkasSiswa_siswa_id_fkey" FOREIGN KEY ("siswa_id") REFERENCES "Siswa"("siswa_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BerkasSiswa" ADD CONSTRAINT "BerkasSiswa_validated_by_fkey" FOREIGN KEY ("validated_by") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogAktivitas" ADD CONSTRAINT "LogAktivitas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InformasiSekolah" ADD CONSTRAINT "InformasiSekolah_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

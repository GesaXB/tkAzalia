import { Role, Status, StatusValidasi, Tipe } from '../../generated/prisma/enums';

// User Seed Types
export interface UserSeedData {
  username: string;
  password: string;
  role: Role;
  nama_lengkap: string;
  email: string;
  no_telp: string;
}

// Siswa Seed Types
export interface SiswaSeedData {
  user_id: number;
}

// Jenis Berkas Seed Types
export interface JenisBerkasSeedData {
  nama_berkas: string;
}

// Berkas Siswa Seed Types
export interface BerkasSiswaSeedData {
  siswa_id: number;
  jenis_berkas_id: number;
  nama_file: string;
  nama_file_hash: string;
  path_file: string;
  ukuran_file: number;
  tipe_file: string;
  status_validasi: StatusValidasi;
  catatan_validasi: string;
}

// Informasi Sekolah Seed Types
export interface InformasiSekolahSeedData {
  judul: string;
  slug: string;
  konten: string;
  tipe: Tipe;
  status: Status;
  urutan: number;
}

// Seed Data Container
export interface SeedDataContainer {
  users: UserSeedData[];
  jenisBerkas: JenisBerkasSeedData[];
  informasiSekolah: InformasiSekolahSeedData[];
}

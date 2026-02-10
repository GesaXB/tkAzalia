import { Role, Status, StatusValidasi, Tipe } from '../../generated/prisma/enums';

export interface UserSeedData {
  username: string;
  password: string;
  role: Role;
  nama_lengkap: string;
  email: string;
  no_telp: string;
}

export interface SiswaSeedData {
  user_id: number;
}

export interface JenisBerkasSeedData {
  nama_berkas: string;
}

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
export interface InformasiSekolahSeedData {
  judul: string;
  slug: string;
  konten: string;
  tipe: Tipe;
  status: Status;
  urutan: number;
}
export interface SeedDataContainer {
  users: UserSeedData[];
  jenisBerkas: JenisBerkasSeedData[];
  informasiSekolah: InformasiSekolahSeedData[];
}

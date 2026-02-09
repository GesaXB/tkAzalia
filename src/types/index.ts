export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  nama_lengkap: string;
  email: string;
  no_telepon: string;
}

export interface SiswaData {
  nama_lengkap: string;
  tempat_lahir: string;
  tanggal_lahir: Date;
  jenis_kelamin: 'L' | 'P';
  alamat: string;
  nama_orangtua: string;
  no_telepon_orangtua: string;
}

export interface InformasiSekolahData {
  judul: string;
  slug: string;
  konten: string;
  tipe: 'profil' | 'visi_misi' | 'fasilitas' | 'pengumuman' | 'kontak' | 'syarat_pendaftaran';
  status?: 'draft' | 'published';
  urutan?: number;
}

export interface LogAktivitasData {
  user_id: number;
  aksi: string;
  deskripsi?: string;
  ip_address?: string;
  user_agent?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export type UserRole = 'admin' | 'user';
export type StatusPendaftaran = 'menunggu' | 'diproses' | 'diterima' | 'ditolak';

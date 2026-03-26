import { apiRequest } from './api';

export interface PublicInformasiSekolahItem {
  info_id: number;
  judul: string;
  slug: string;
  konten: string;
  ringkasan?: string | null;
  gambar?: string | null;
  tipe: string;
  status: string;
  urutan: number;
  created_at?: string;
}

export interface PpdbJadwalPublic {
  id: number;
  tanggal_mulai: string;
  tanggal_selesai: string;
  dibuka?: boolean;
}

export async function listInformasiPublik() {
  return apiRequest<PublicInformasiSekolahItem[]>('/api/informasi-sekolah', {
    method: 'GET',
  });
}

export async function getJadwalPpdb() {
  return apiRequest<{ id: number; tanggal_mulai: string; tanggal_selesai: string; dibuka: boolean } | null>(
    '/api/ppdb/jadwal',
    { method: 'GET' }
  );
}

export async function getArtikelBySlug(slug: string) {
  return apiRequest<PublicInformasiSekolahItem>(`/api/informasi-sekolah/${encodeURIComponent(slug)}`, {
    method: 'GET',
  });
}

export interface KelasPublicItem {
  kelas_id: number;
  nama: string;
  deskripsi?: string | null;
  urutan: number;
}

export async function listKelasPublik() {
  return apiRequest<KelasPublicItem[]>('/api/kelas', { method: 'GET' });
}


export interface PublicKomentar {
  komentar_id: number;
  info_id: number;
  user_id: number | null;
  parent_id?: number | null;
  nama: string;
  isi: string;
  created_at: string;
  user?: {
    user_id: number;
    nama_lengkap: string;
    role: string;
  };
}

export async function listKomentarByInfoId(infoId: number) {
  return apiRequest<PublicKomentar[]>(`/api/public/blog/${infoId}/comments`, {
    method: 'GET',
  });
}

export async function addKomentar(infoId: number, data: { nama: string, isi: string, parent_id?: number | null }) {
  return apiRequest<PublicKomentar>(`/api/public/blog/${infoId}/comments`, {
    method: 'POST',
    body: JSON.stringify(data),
  }, true);
}

export async function updateKomentar(commentId: number, isi: string) {
  return apiRequest<PublicKomentar>(`/api/public/comments/${commentId}`, {
    method: 'PATCH',
    body: JSON.stringify({ isi }),
  }, true);
}

export async function publicDeleteKomentar(commentId: number) {
  return apiRequest<{ message: string }>(`/api/public/comments/${commentId}`, {
    method: 'DELETE',
  }, true);
}

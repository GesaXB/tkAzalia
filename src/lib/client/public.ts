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


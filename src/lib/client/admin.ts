import { apiRequest } from './api';
import { getToken } from './session';
import { StatusPpdb } from '@/types';

export async function uploadBlogImage(file: File): Promise<{ success: true; data: { url: string } } | { success: false; error: string }> {
  const token = getToken();
  if (!token) {
    return { success: false, error: 'Belum masuk' };
  }
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) {
    return { success: false, error: (data && data.error) || 'Upload gagal' };
  }
  if (data?.success && data?.data?.url) {
    return { success: true, data: { url: data.data.url } };
  }
  return { success: false, error: 'Respons tidak valid' };
}

export interface KelasItem {
  kelas_id: number;
  nama: string;
  urutan: number;
}

export interface AdminPpdbSiswa {
  siswa_id: number;
  user_id: number;
  kelas_id?: number | null;
  status_ppdb?: StatusPpdb;
  catatan_ppdb?: string | null;
  user: {
    user_id: number;
    username: string;
    role: string;
    nama_lengkap: string;
    email: string;
    no_telp: string;
  };
  kelas?: KelasItem | null;
  berkas: Array<{
    berkas_siswa_id: number;
    jenis_berkas_id: number;
    nama_file: string;
    path_file: string;
    tipe_file: string;
    status_validasi: string;
    catatan_validasi: string;
    jenisBerkas: {
      jenis_berkas_id: number;
      nama_berkas: string;
    };
  }>;
}

export async function getPpdbSiswaById(siswaId: number) {
  return apiRequest<AdminPpdbSiswa>(`/api/admin/ppdb/keputusan/${siswaId}`, {
    method: 'GET',
  }, true);
}

export async function listKelasAdmin() {
  return apiRequest<KelasItem[]>('/api/admin/kelas', { method: 'GET' }, true);
}

export async function createKelasAdmin(payload: { nama: string; urutan?: number }) {
  return apiRequest<KelasItem>('/api/admin/kelas', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, true);
}

export async function updateKelasAdmin(kelasId: number, payload: { nama?: string; urutan?: number }) {
  return apiRequest<KelasItem>(`/api/admin/kelas/${kelasId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }, true);
}

export async function deleteKelasAdmin(kelasId: number) {
  return apiRequest(`/api/admin/kelas/${kelasId}`, { method: 'DELETE' }, true);
}

export interface InformasiSekolahItem {
  info_id: number;
  judul: string;
  slug: string;
  konten: string;
  ringkasan?: string | null;
  gambar?: string | null;
  tipe: string;
  status: string;
  urutan: number;
}

export interface UpdatePpdbPayload {
  siswa_id: number;
  status_ppdb: StatusPpdb;
  catatan_ppdb?: string | null;
}

export interface InformasiSekolahPayload {
  judul: string;
  slug: string;
  konten: string;
  ringkasan?: string | null;
  gambar?: string | null;
  tipe: string;
  status: string;
  urutan: number;
}

export async function listPpdbSiswa() {
  return apiRequest<AdminPpdbSiswa[]>('/api/admin/ppdb/keputusan', {
    method: 'GET',
  }, true);
}

export async function updatePpdbStatus(payload: UpdatePpdbPayload) {
  return apiRequest('/api/admin/ppdb/keputusan', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, true);
}

export async function listInformasiSekolah() {
  return apiRequest<InformasiSekolahItem[]>('/api/admin/informasi-sekolah', {
    method: 'GET',
  }, true);
}

export async function createInformasiSekolah(payload: InformasiSekolahPayload) {
  return apiRequest<InformasiSekolahItem>('/api/admin/informasi-sekolah', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, true);
}

export async function updateInformasiSekolah(info_id: number, payload: InformasiSekolahPayload) {
  return apiRequest<InformasiSekolahItem>('/api/admin/informasi-sekolah', {
    method: 'PUT',
    body: JSON.stringify({ info_id, data: payload }),
  }, true);
}

export async function deleteInformasiSekolah(info_id: number) {
  return apiRequest(`/api/admin/informasi-sekolah/${info_id}`, {
    method: 'DELETE',
  }, true);
}

export interface PpdbJadwalPayload {
  tanggal_mulai: string;
  tanggal_selesai: string;
}

export async function getJadwalPpdbAdmin() {
  return apiRequest<{ id: number; tanggal_mulai: string; tanggal_selesai: string; dibuka: boolean } | null>(
    '/api/admin/ppdb/jadwal',
    { method: 'GET' },
    true
  );
}

export async function updateJadwalPpdb(payload: PpdbJadwalPayload) {
  return apiRequest<{ id: number; tanggal_mulai: string; tanggal_selesai: string }>(
    '/api/admin/ppdb/jadwal',
    { method: 'PUT', body: JSON.stringify(payload) },
    true
  );
}

export async function resetJadwalPpdb() {
  return apiRequest<null>('/api/admin/ppdb/jadwal', { method: 'DELETE' }, true);
}
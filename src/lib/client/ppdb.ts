import { apiRequest } from './api';
import { getToken } from './session';

export interface PpdbStatus {
  status_ppdb: string;
  catatan_ppdb: string | null;
}

export interface BerkasSiswaItem {
  berkas_siswa_id: number;
  siswa_id: number;
  jenis_berkas_id: number;
  nama_file: string;
  nama_file_hash: string;
  path_file: string;
  ukuran_file: number;
  tipe_file: string;
  status_validasi: string;
  catatan_validasi: string;
  tanggal_unggah: string;
  jenisBerkas?: {
    jenis_berkas_id: number;
    nama_berkas: string;
  };
}

export interface CreateBerkasPayload {
  jenis_berkas_id: number;
  nama_file: string;
  path_file: string;
  ukuran_file: number;
  tipe_file: string;
  nama_file_hash?: string;
}

export interface JenisBerkasItem {
  jenis_berkas_id: number;
  nama_berkas: string;
}

export interface KelasItem {
  kelas_id: number;
  nama: string;
  urutan: number;
}

export async function getListKelas() {
  return apiRequest<KelasItem[]>('/api/kelas', { method: 'GET' });
}

export async function getSiswaMe() {
  return apiRequest<{
    siswa_id: number;
    kelas_id: number | null;
    kelas: KelasItem | null;
    status_ppdb: string;
  }>('/api/ppdb/siswa', { method: 'GET' }, true);
}

export async function updateSiswaKelas(kelasId: number | null) {
  return apiRequest<{ siswa_id: number; kelas_id: number | null; kelas: KelasItem | null }>('/api/ppdb/siswa', {
    method: 'PATCH',
    body: JSON.stringify({ kelas_id: kelasId }),
  }, true);
}

export async function ensureSiswa() {
  return apiRequest('/api/ppdb/siswa', {
    method: 'POST',
  }, true);
}

export async function getPpdbStatus() {
  return apiRequest<PpdbStatus>('/api/ppdb/status', {
    method: 'GET',
  }, true);
}

export async function listBerkas() {
  return apiRequest<BerkasSiswaItem[]>('/api/ppdb/berkas', {
    method: 'GET',
  }, true);
}

export async function createBerkas(payload: CreateBerkasPayload) {
  return apiRequest<BerkasSiswaItem>('/api/ppdb/berkas', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, true);
}

export async function listJenisBerkas() {
  return apiRequest<JenisBerkasItem[]>('/api/ppdb/jenis-berkas', {
    method: 'GET',
  }, true);
}

export async function updateBerkas(berkasSiswaId: number, payload: Partial<CreateBerkasPayload>) {
  return apiRequest<BerkasSiswaItem>(`/api/ppdb/berkas/${berkasSiswaId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  }, true);
}

export async function deleteBerkas(berkasSiswaId: number) {
  return apiRequest(`/api/ppdb/berkas/${berkasSiswaId}`, {
    method: 'DELETE',
  }, true);
}

export interface UploadBerkasResult {
  path_file: string;
  nama_file: string;
  ukuran_file: number;
  tipe_file: string;
}

export async function uploadBerkasFile(file: File) {
  const token = getToken();
  const formData = new FormData();
  formData.append('file', file);
  const headers: HeadersInit = {};
  if (token) (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  const response = await fetch('/api/ppdb/upload', {
    method: 'POST',
    body: formData,
    headers,
  });
  const text = await response.text();
  let data: { success?: boolean; error?: string; data?: UploadBerkasResult };
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    return { success: false as const, error: 'Respons tidak valid' };
  }
  if (!response.ok) {
    return { success: false as const, error: data?.error || 'Upload gagal' };
  }
  return { success: true as const, data: data?.data };
}


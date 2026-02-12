import { apiRequest } from './api';
import { StatusPpdb } from '@/types';

export interface AdminPpdbSiswa {
  siswa_id: number;
  user_id: number;
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
  berkas: Array<{
    berkas_siswa_id: number;
    jenis_berkas_id: number;
    nama_file: string;
    status_validasi: string;
    catatan_validasi: string;
    jenisBerkas: {
      jenis_berkas_id: number;
      nama_berkas: string;
    };
  }>;
}

export interface InformasiSekolahItem {
  info_id: number;
  judul: string;
  slug: string;
  konten: string;
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


"use client";

import { useEffect, useState } from "react";
import SiswaUploadSection from "@/Components/Dashboard/Siswa/SiswaUploadSection";
import SiswaBerkasSection from "@/Components/Dashboard/Siswa/SiswaBerkasSection";
import {
  BerkasSiswaItem,
  CreateBerkasPayload,
  JenisBerkasItem,
  createBerkas,
  deleteBerkas,
  ensureSiswa,
  listBerkas,
  listJenisBerkas,
  updateBerkas,
  uploadBerkasFile,
} from "@/lib/client/ppdb";
import { getJadwalPpdb } from "@/lib/client/public";

export default function SiswaBerkasPage() {
  const [error, setError] = useState<string | null>(null);
  const [berkasList, setBerkasList] = useState<BerkasSiswaItem[]>([]);
  const [jenisBerkasList, setJenisBerkasList] = useState<JenisBerkasItem[]>([]);
  const [form, setForm] = useState<CreateBerkasPayload>({
    jenis_berkas_id: 0,
    nama_file: "",
    path_file: "",
    ukuran_file: 0,
    tipe_file: "",
  });
  const [fileName, setFileName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ppdbDibuka, setPpdbDibuka] = useState(true);

  useEffect(() => {
    const load = async () => {
      setError(null);
      const [jenisRes, berkasResponse, jadwalRes] = await Promise.all([
        listJenisBerkas(),
        listBerkas(),
        getJadwalPpdb(),
      ]);
      if (jenisRes.success && jenisRes.data?.length) {
        setJenisBerkasList(jenisRes.data);
        setForm((f) => ({ ...f, jenis_berkas_id: jenisRes.data![0].jenis_berkas_id }));
      }
      if (!berkasResponse.success) {
        setError(berkasResponse.error || "Gagal memuat berkas");
      }
      setBerkasList(berkasResponse.data || []);
      setPpdbDibuka(jadwalRes.success && jadwalRes.data?.dibuka === true);
    };
    load();
  }, []);

  const handleLogout = () => {
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!ppdbDibuka) {
      setError("Periode PPDB telah berakhir. Upload tidak tersedia.");
      return;
    }
    if (!form.jenis_berkas_id || form.jenis_berkas_id < 1) {
      setError("Pilih jenis berkas");
      return;
    }
    if (!selectedFile) {
      setError("Pilih file untuk diunggah");
      return;
    }
    const uploadRes = await uploadBerkasFile(selectedFile);
    if (!uploadRes.success || !uploadRes.data) {
      setError(uploadRes.error || "Gagal mengunggah file");
      return;
    }
    const payload: CreateBerkasPayload = {
      jenis_berkas_id: form.jenis_berkas_id,
      nama_file: uploadRes.data.nama_file,
      path_file: uploadRes.data.path_file,
      ukuran_file: uploadRes.data.ukuran_file,
      tipe_file: uploadRes.data.tipe_file,
    };
    const response = await createBerkas(payload);
    if (!response.success) {
      setError(response.error || "Gagal menyimpan berkas");
      return;
    }
    const refreshed = await listBerkas();
    if (refreshed.success && refreshed.data) {
      setBerkasList(refreshed.data);
    }
    setForm({
      ...form,
      nama_file: "",
      path_file: "",
      ukuran_file: 0,
      tipe_file: "",
    });
    setFileName("");
    setSelectedFile(null);
  };

  const handleDelete = async (berkasSiswaId: number) => {
    setError(null);
    if (!ppdbDibuka) {
      setError("Periode PPDB telah berakhir. Hapus berkas tidak tersedia.");
      return;
    }
    const response = await deleteBerkas(berkasSiswaId);
    if (!response.success) {
      setError(response.error || "Gagal menghapus berkas");
      return;
    }
    const refreshed = await listBerkas();
    if (refreshed.success && refreshed.data) setBerkasList(refreshed.data);
  };

  const handleUpdate = async (
    berkasSiswaId: number,
    payload: Partial<CreateBerkasPayload>,
    newFile?: File
  ) => {
    setError(null);
    if (!ppdbDibuka) {
      setError("Periode PPDB telah berakhir. Perubahan berkas tidak tersedia.");
      throw new Error("PPDB berakhir");
    }
    let finalPayload = payload;
    if (newFile) {
      const uploadRes = await uploadBerkasFile(newFile);
      if (!uploadRes.success || !uploadRes.data) {
        setError(uploadRes.error || "Gagal mengunggah file");
        throw new Error(uploadRes.error);
      }
      finalPayload = {
        nama_file: uploadRes.data.nama_file,
        path_file: uploadRes.data.path_file,
        ukuran_file: uploadRes.data.ukuran_file,
        tipe_file: uploadRes.data.tipe_file,
      };
    }
    const response = await updateBerkas(berkasSiswaId, finalPayload);
    if (!response.success) {
      setError(response.error || "Gagal memperbarui berkas");
      throw new Error(response.error);
    }
    const refreshed = await listBerkas();
    if (refreshed.success && refreshed.data) setBerkasList(refreshed.data);
  };

  return (
    <>
      {/* Page Header */}
      <div className="mb-8 bg-linear-to-r from-[#01793B]/5 to-[#01793B]/10 rounded-2xl p-6 border border-[#01793B]/10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#01793B]/15 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-[#01793B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8l-6-2m6 2l6-2m-6-8l-6-2m6 2l6-2m0-4V5m0 14l-6 2m6-2l6 2" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Kelengkapan Berkas</h1>
            <p className="text-gray-600 mt-2 leading-relaxed">
              Unggah semua dokumen pendukung yang diperlukan untuk melengkapi berkas pendaftaran Anda. Pastikan semua berkas sudah diunggah sebelum batas waktu PPDB.
            </p>
          </div>
        </div>
      </div>

      {error ? (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <svg className="h-5 w-5 shrink-0 mt-0.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <div>
            <p className="font-semibold text-red-900">Terjadi kesalahan</p>
            <p className="text-red-800 text-sm mt-0.5">{error}</p>
          </div>
        </div>
      ) : null}

      {!ppdbDibuka && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
          <svg className="h-5 w-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <div>
            <p className="font-semibold">Periode pendaftaran PPDB telah berakhir</p>
            <p className="text-sm mt-0.5 opacity-90">
              Anda hanya dapat melihat daftar berkas yang sudah diunggah. Upload, perubahan, atau penghapusan berkas tidak lagi tersedia.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <SiswaUploadSection
          form={form}
          fileName={fileName}
          jenisBerkasList={jenisBerkasList}
          onChangeForm={setForm}
          onChangeFileName={setFileName}
          onFileSelect={setSelectedFile}
          onSubmit={handleSubmit}
          disabled={!ppdbDibuka}
        />

        <SiswaBerkasSection
          berkasList={berkasList}
          onDelete={ppdbDibuka ? handleDelete : undefined}
          onUpdate={ppdbDibuka ? handleUpdate : undefined}
          uploadDisabled={!ppdbDibuka}
        />
      </div>
    </>
  );
}


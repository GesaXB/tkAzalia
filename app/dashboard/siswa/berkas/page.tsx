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
  getSpmbStatus,
} from "@/lib/client/spmb";
import { getJadwalPpdb } from "@/lib/client/public";
import { useToast } from "@/context/ToastContext";
import { AlertCircle } from "lucide-react";

export default function SiswaBerkasPage() {
  const { error: toastError, success: toastSuccess } = useToast();
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
  const [spmbDibuka, setSpmbDibuka] = useState(true);
  const [isConfirmingUpload, setIsConfirmingUpload] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const load = async () => {
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
        toastError(berkasResponse.error || "Gagal memuat berkas");
      }
      setBerkasList(berkasResponse.data || []);
      setSpmbDibuka(jadwalRes.success && jadwalRes.data?.dibuka === true);
    };
    load();
  }, [toastError]);

  const handleLogout = () => {
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!spmbDibuka) {
      toastError("Periode SPMB telah berakhir. Upload tidak tersedia.");
      return;
    }
    if (!form.jenis_berkas_id || form.jenis_berkas_id < 1) {
      toastError("Pilih jenis berkas");
      return;
    }
    if (!selectedFile) {
      toastError("Pilih file untuk diunggah");
      return;
    }

    // Validasi duplikasi: cek apakah jenis berkas ini sudah pernah diunggah
    const isDuplicate = berkasList.some(b => b.jenis_berkas_id === form.jenis_berkas_id);
    if (isDuplicate) {
      toastError("Berkas dengan jenis ini sudah diunggah. Silakan hapus atau ubah berkas yang sudah ada.");
      return;
    }
    
    // Buka modal konfirmasi
    setIsConfirmingUpload(true);
  };

  const processUpload = async () => {
    if (!selectedFile) return;
    
    setIsConfirmingUpload(false);
    setIsUploading(true);
    
    try {
      const uploadRes = await uploadBerkasFile(selectedFile);
      if (!uploadRes.success || !uploadRes.data) {
        toastError(uploadRes.error || "Gagal mengunggah file");
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
        toastError(response.error || "Gagal menyimpan berkas");
        return;
      }
      toastSuccess("Berkas berhasil disimpan");
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
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (berkasSiswaId: number) => {
    if (!spmbDibuka) {
      toastError("Periode SPMB telah berakhir. Hapus berkas tidak tersedia.");
      return;
    }
    const response = await deleteBerkas(berkasSiswaId);
    if (!response.success) {
      toastError(response.error || "Gagal menghapus berkas");
      return;
    }
    toastSuccess("Berkas berhasil dihapus");
    const refreshed = await listBerkas();
    if (refreshed.success && refreshed.data) setBerkasList(refreshed.data);
  };

  const handleUpdate = async (
    berkasSiswaId: number,
    payload: Partial<CreateBerkasPayload>,
    newFile?: File
  ) => {
    if (!spmbDibuka) {
      toastError("Periode SPMB telah berakhir. Perubahan berkas tidak tersedia.");
      throw new Error("SPMB berakhir");
    }
    let finalPayload = payload;
    if (newFile) {
      const uploadRes = await uploadBerkasFile(newFile);
      if (!uploadRes.success || !uploadRes.data) {
        toastError(uploadRes.error || "Gagal mengunggah file");
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
      toastError(response.error || "Gagal memperbarui berkas");
      throw new Error(response.error);
    }
    toastSuccess("Berkas berhasil diperbarui");
    const refreshed = await listBerkas();
    if (refreshed.success && refreshed.data) setBerkasList(refreshed.data);
  };

  return (
    <>
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Upload Berkas</h1>
        <p className="text-sm text-gray-400 mt-0.5">Unggah dokumen pendukung untuk melengkapi pendaftaran</p>
      </div>

      {!spmbDibuka && (
        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50 px-5 py-3 text-sm font-medium text-amber-700">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>Periode pendaftaran SPMB telah berakhir. Upload dan perubahan berkas tidak tersedia.</span>
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
          disabled={!spmbDibuka || isUploading}
          uploadedJenisIds={berkasList.map(b => b.jenis_berkas_id)}
        />

        <SiswaBerkasSection
          berkasList={berkasList}
          onDelete={spmbDibuka ? handleDelete : undefined}
          onUpdate={spmbDibuka ? handleUpdate : undefined}
          uploadDisabled={!spmbDibuka}
        />
      </div>

      {/* Modal Konfirmasi Upload */}
      {isConfirmingUpload && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsConfirmingUpload(false)}
        >
          <div 
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 mb-4 mx-auto">
              <svg className="h-6 w-6 text-[#01793B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            
            <h3 className="text-lg font-bold text-center text-gray-900 mb-2">Konfirmasi Unggah</h3>
            <p className="text-sm text-center text-gray-500 mb-6">
              Apakah Anda yakin ingin mengunggah berkas <span className="font-semibold text-gray-700">{fileName}</span> sebagai <span className="font-semibold text-gray-700">{jenisBerkasList.find(j => j.jenis_berkas_id === form.jenis_berkas_id)?.nama_berkas}</span>?
            </p>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmingUpload(false)}
                className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={processUpload}
                className="flex-1 rounded-xl bg-[#01793B] py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}

      {isUploading && (
        <div className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="relative h-16 w-16 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
            <div className="absolute inset-0 rounded-full border-4 border-[#01793B] border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-900 font-bold">Sedang Mengunggah...</p>
          <p className="text-sm text-gray-500 mt-1 italic">Mohon tunggu sebentar</p>
        </div>
      )}
    </>
  );
}


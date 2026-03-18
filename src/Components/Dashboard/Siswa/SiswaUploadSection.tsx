"use client";

import { CreateBerkasPayload, JenisBerkasItem } from "@/lib/client/spmb";
import { Upload } from "lucide-react";

interface SiswaUploadSectionProps {
  form: CreateBerkasPayload;
  fileName: string;
  jenisBerkasList: JenisBerkasItem[];
  onChangeForm: (next: CreateBerkasPayload) => void;
  onChangeFileName: (next: string) => void;
  onFileSelect?: (file: File | null) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
  uploadedJenisIds?: number[];
}

const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-4 focus:ring-[#01793B]/10 focus:border-[#01793B] outline-none transition-all bg-white";

export default function SiswaUploadSection({
  form,
  fileName,
  jenisBerkasList,
  onChangeForm,
  onChangeFileName,
  onFileSelect,
  onSubmit,
  disabled = false,
  uploadedJenisIds = [],
}: SiswaUploadSectionProps) {
  if (disabled) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#01793B]">
          <Upload size={18} />
        </div>
        <div>
          <h2 className="font-bold text-gray-900">Unggah Berkas Baru</h2>
          <p className="text-xs text-gray-400 mt-0.5">Pilih jenis dan file yang akan diunggah</p>
        </div>
      </div>

      <form className="p-6 space-y-5" onSubmit={onSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Jenis Berkas */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Jenis Berkas
            </label>
            <select
              value={form.jenis_berkas_id}
              onChange={(e) => onChangeForm({ ...form, jenis_berkas_id: Number(e.target.value) })}
              className={inputClass}
              required
            >
              <option value={0}>Pilih jenis berkas</option>
              {jenisBerkasList.map((j) => {
                const isUploaded = uploadedJenisIds.includes(j.jenis_berkas_id);
                return (
                  <option key={j.jenis_berkas_id} value={j.jenis_berkas_id} disabled={isUploaded}>
                    {j.nama_berkas}{isUploaded ? " (sudah diunggah)" : ""}
                  </option>
                );
              })}
            </select>
          </div>

          {/* File Picker */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              File
            </label>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) { onChangeFileName(""); onFileSelect?.(null); return; }
                onChangeFileName(file.name);
                onFileSelect?.(file);
                onChangeForm({
                  ...form,
                  nama_file: file.name,
                  path_file: "",
                  ukuran_file: Math.ceil(file.size / 1024),
                  tipe_file: file.type || "application/octet-stream",
                });
              }}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-[#01793B] cursor-pointer"
              required
            />
            {fileName && (
              <p className="mt-1.5 text-xs text-gray-400 truncate">
                Dipilih: <span className="font-medium text-gray-600">{fileName}</span>
              </p>
            )}
          </div>
        </div>

        {/* Metadata row — auto-filled, read-only style */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Nama File</label>
            <input
              value={form.nama_file}
              onChange={(e) => onChangeForm({ ...form, nama_file: e.target.value })}
              placeholder="Otomatis dari file"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Ukuran (KB)</label>
            <input
              type="number"
              min={0}
              value={form.ukuran_file || ""}
              onChange={(e) => onChangeForm({ ...form, ukuran_file: Number(e.target.value) || 0 })}
              placeholder="0"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Tipe File</label>
            <input
              value={form.tipe_file}
              readOnly
              className={`${inputClass} bg-slate-50 text-gray-400`}
            />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#01793B] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100 active:scale-95"
          >
            <Upload size={14} />
            Simpan Berkas
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import SectionCard from "../SectionCard";
import { CreateBerkasPayload, JenisBerkasItem } from "@/lib/client/ppdb";

interface SiswaUploadSectionProps {
  form: CreateBerkasPayload;
  fileName: string;
  jenisBerkasList: JenisBerkasItem[];
  onChangeForm: (next: CreateBerkasPayload) => void;
  onChangeFileName: (next: string) => void;
  onFileSelect?: (file: File | null) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function SiswaUploadSection({
  form,
  fileName,
  jenisBerkasList,
  onChangeForm,
  onChangeFileName,
  onFileSelect,
  onSubmit,
}: SiswaUploadSectionProps) {
  return (
    <SectionCard
      title="Upload Berkas"
      description="Pilih jenis berkas dan unggah file. Data akan terisi otomatis dari file."
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Jenis berkas</label>
            <select
              value={form.jenis_berkas_id}
              onChange={(event) =>
                onChangeForm({ ...form, jenis_berkas_id: Number(event.target.value) })
              }
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
              required
            >
              <option value={0}>Pilih jenis berkas</option>
              {jenisBerkasList.map((j) => (
                <option key={j.jenis_berkas_id} value={j.jenis_berkas_id}>
                  {j.nama_berkas}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">File</label>
            <input
              type="file"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) {
                  onChangeFileName("");
                  onFileSelect?.(null);
                  return;
                }
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
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm file:mr-2 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-emerald-700"
              required
            />
            {fileName && (
              <p className="mt-1 text-xs text-gray-500">Dipilih: {fileName}</p>
            )}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Nama file</label>
            <input
              value={form.nama_file}
              onChange={(e) => onChangeForm({ ...form, nama_file: e.target.value })}
              placeholder="Contoh: akte.pdf"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Path (isi otomatis setelah pilih file)</label>
            <input
              value={form.path_file}
              onChange={(e) => onChangeForm({ ...form, path_file: e.target.value })}
              placeholder="/uploads/..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Ukuran (KB)</label>
            <input
              type="number"
              min={0}
              value={form.ukuran_file || ""}
              onChange={(e) =>
                onChangeForm({ ...form, ukuran_file: Number(e.target.value) || 0 })
              }
              placeholder="0"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-[#01793B] px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Simpan Berkas
          </button>
          <span className="text-xs text-gray-400">
            {form.tipe_file ? `Tipe: ${form.tipe_file}` : ""}
          </span>
        </div>
      </form>
    </SectionCard>
  );
}


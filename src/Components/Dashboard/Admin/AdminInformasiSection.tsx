"use client";

import { useState, useMemo } from "react";
import { InformasiSekolahItem, uploadBlogImage } from "@/lib/client/admin";
import SectionCard from "../SectionCard";
import { FileText, Image as ImageIcon, Search, X, Upload } from "lucide-react";

interface InfoFormState {
  judul: string;
  slug: string;
  konten: string;
  ringkasan: string;
  gambar: string;
  tipe: string;
  status: string;
  urutan: number;
}

interface InfoUpdateState extends InfoFormState {
  info_id: string;
}

interface AdminInformasiSectionProps {
  infoList: InformasiSekolahItem[];
  infoForm: InfoFormState;
  infoUpdate: InfoUpdateState;
  onChangeInfoForm: (next: InfoFormState) => void;
  onChangeInfoUpdate: (next: InfoUpdateState) => void;
  onCreate: (event: React.FormEvent<HTMLFormElement>) => void;
  onUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
  onSelectInfo?: (info: InformasiSekolahItem) => void;
  onDeleteInfo?: (info_id: number) => void;
  editingId: number | null;
  onCloseEditModal: () => void;
}

const TIPE_OPTIONS = [
  { value: "berita", label: "Berita" },
  { value: "artikel", label: "Artikel" },
  { value: "kegiatan", label: "Kegiatan" },
  { value: "profil", label: "Profil" },
  { value: "visi", label: "Visi" },
  { value: "misi", label: "Misi" },
  { value: "fasilitas", label: "Fasilitas" },
  { value: "kontak", label: "Kontak" },
  { value: "syarat_pendaftaran", label: "Syarat Pendaftaran" },
];

export default function AdminInformasiSection({
  infoList,
  infoForm,
  infoUpdate,
  onChangeInfoForm,
  onChangeInfoUpdate,
  onCreate,
  onUpdate,
  onSelectInfo,
  onDeleteInfo,
  editingId,
  onCloseEditModal,
}: AdminInformasiSectionProps) {
  const [search, setSearch] = useState("");
  const [filterTipe, setFilterTipe] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [uploadingCreate, setUploadingCreate] = useState(false);
  const [uploadingEdit, setUploadingEdit] = useState(false);

  const filteredList = useMemo(() => {
    let list = infoList;
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (info) =>
          info.judul.toLowerCase().includes(q) || info.slug.toLowerCase().includes(q)
      );
    }
    if (filterTipe) list = list.filter((info) => info.tipe === filterTipe);
    if (filterStatus) list = list.filter((info) => info.status === filterStatus);
    return list;
  }, [infoList, search, filterTipe, filterStatus]);

  const handleCreateImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCreate(true);
    const res = await uploadBlogImage(file);
    setUploadingCreate(false);
    if (res.success) onChangeInfoForm({ ...infoForm, gambar: res.data.url });
    e.target.value = "";
  };

  const handleEditImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingEdit(true);
    const res = await uploadBlogImage(file);
    setUploadingEdit(false);
    if (res.success) onChangeInfoUpdate({ ...infoUpdate, gambar: res.data.url });
    e.target.value = "";
  };

  const isEditOpen = editingId != null && String(editingId) === infoUpdate.info_id;

  return (
    <SectionCard
      title="Blog"
      description="Kelola artikel blog dengan gambar, kategori, dan konten lengkap."
    >
      <div className="space-y-8">
        {/* Form buat artikel baru */}
        <form
          onSubmit={onCreate}
          className="rounded-xl border border-gray-100 bg-gray-50/50 p-5 space-y-4"
        >
          <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <FileText size={18} />
            Buat Artikel Baru
          </h3>
          <input
            value={infoForm.judul}
            onChange={(e) => onChangeInfoForm({ ...infoForm, judul: e.target.value })}
            placeholder="Judul artikel"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
            required
          />
          <input
            value={infoForm.slug}
            onChange={(e) => onChangeInfoForm({ ...infoForm, slug: e.target.value })}
            placeholder="Slug URL (contoh: berita-acara-tahunan)"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
            required
          />
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600 flex items-center gap-2">
              <ImageIcon size={14} />
              Gambar (unggah file atau isi URL)
            </label>
            <div className="flex gap-2 flex-wrap">
              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm cursor-pointer hover:bg-gray-50">
                <Upload size={16} />
                {uploadingCreate ? "Mengunggah..." : "Pilih file"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  className="hidden"
                  onChange={handleCreateImageChange}
                  disabled={uploadingCreate}
                />
              </label>
              <input
                value={infoForm.gambar}
                onChange={(e) => onChangeInfoForm({ ...infoForm, gambar: e.target.value })}
                placeholder="URL gambar (opsional)"
                className="flex-1 min-w-[180px] px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
              />
            </div>
            {infoForm.gambar && (
              <img
                src={infoForm.gambar}
                alt="Preview"
                className="h-20 w-auto rounded-lg border border-gray-200 object-cover"
              />
            )}
          </div>
          <textarea
            value={infoForm.ringkasan}
            onChange={(e) => onChangeInfoForm({ ...infoForm, ringkasan: e.target.value })}
            placeholder="Ringkasan / excerpt (opsional)"
            rows={2}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all resize-none"
          />
          <textarea
            value={infoForm.konten}
            onChange={(e) => onChangeInfoForm({ ...infoForm, konten: e.target.value })}
            placeholder="Konten artikel"
            rows={4}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all resize-none"
            required
          />
          <div className="grid gap-3 sm:grid-cols-3">
            <select
              value={infoForm.tipe}
              onChange={(e) => onChangeInfoForm({ ...infoForm, tipe: e.target.value })}
              className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
            >
              {TIPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <select
              value={infoForm.status}
              onChange={(e) => onChangeInfoForm({ ...infoForm, status: e.target.value })}
              className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <input
              type="number"
              value={infoForm.urutan}
              onChange={(e) =>
                onChangeInfoForm({ ...infoForm, urutan: Number(e.target.value) || 1 })
              }
              placeholder="Urutan"
              min={1}
              className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-lg bg-[#01793B] text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            Simpan Artikel
          </button>
        </form>

        {/* Filter & pencarian + daftar artikel */}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari judul atau slug..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
              />
            </div>
            <select
              value={filterTipe}
              onChange={(e) => setFilterTipe(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
            >
              <option value="">Semua tipe</option>
              {TIPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
            >
              <option value="">Semua status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <h3 className="text-sm font-semibold text-gray-800 mb-4">Daftar Artikel</h3>
          {filteredList.length === 0 ? (
            <p className="text-sm text-gray-500 py-8 text-center rounded-xl border border-dashed border-gray-200">
              {infoList.length === 0
                ? "Belum ada artikel."
                : "Tidak ada artikel yang cocok dengan filter."}
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredList.map((info) => (
                <article
                  key={info.info_id}
                  className="group rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => onSelectInfo?.(info)}
                    className="w-full text-left block"
                  >
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      {info.gambar ? (
                        <img
                          src={info.gambar}
                          alt={info.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <ImageIcon size={40} />
                        </div>
                      )}
                      <span
                        className={`absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-medium ${
                          info.status === "published"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {info.status}
                      </span>
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-medium bg-white/90 text-gray-600">
                        {TIPE_OPTIONS.find((o) => o.value === info.tipe)?.label || info.tipe}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                        {info.judul}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">{info.slug}</p>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {info.ringkasan || info.konten}
                      </p>
                    </div>
                  </button>
                  {onDeleteInfo && (
                    <div className="px-4 pb-4 pt-0">
                      <button
                        type="button"
                        onClick={(ev) => {
                          ev.stopPropagation();
                          onDeleteInfo(info.info_id);
                        }}
                        className="text-xs text-red-600 hover:text-red-700 hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal edit */}
      {isEditOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={onCloseEditModal}
        >
          <div
            className="bg-white rounded-xl shadow-xl border border-gray-100 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Edit Artikel</h3>
              <button
                type="button"
                onClick={onCloseEditModal}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                aria-label="Tutup"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={onUpdate} className="p-5 space-y-4">
              <input type="hidden" value={infoUpdate.info_id} readOnly />
              <input
                value={infoUpdate.judul}
                onChange={(e) => onChangeInfoUpdate({ ...infoUpdate, judul: e.target.value })}
                placeholder="Judul"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
                required
              />
              <input
                value={infoUpdate.slug}
                onChange={(e) => onChangeInfoUpdate({ ...infoUpdate, slug: e.target.value })}
                placeholder="Slug"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
                required
              />
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600 flex items-center gap-2">
                  <ImageIcon size={14} />
                  Gambar (unggah file atau isi URL)
                </label>
                <div className="flex gap-2 flex-wrap">
                  <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm cursor-pointer hover:bg-gray-50">
                    <Upload size={16} />
                    {uploadingEdit ? "Mengunggah..." : "Pilih file"}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      className="hidden"
                      onChange={handleEditImageChange}
                      disabled={uploadingEdit}
                    />
                  </label>
                  <input
                    value={infoUpdate.gambar}
                    onChange={(e) => onChangeInfoUpdate({ ...infoUpdate, gambar: e.target.value })}
                    placeholder="URL gambar"
                    className="flex-1 min-w-[180px] px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
                  />
                </div>
                {infoUpdate.gambar && (
                  <img
                    src={infoUpdate.gambar}
                    alt="Preview"
                    className="h-20 w-auto rounded-lg border border-gray-200 object-cover"
                  />
                )}
              </div>
              <textarea
                value={infoUpdate.ringkasan}
                onChange={(e) => onChangeInfoUpdate({ ...infoUpdate, ringkasan: e.target.value })}
                placeholder="Ringkasan"
                rows={2}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 resize-none"
              />
              <textarea
                value={infoUpdate.konten}
                onChange={(e) => onChangeInfoUpdate({ ...infoUpdate, konten: e.target.value })}
                placeholder="Konten"
                rows={4}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 resize-none"
                required
              />
              <div className="grid gap-3 sm:grid-cols-3">
                <select
                  value={infoUpdate.tipe}
                  onChange={(e) => onChangeInfoUpdate({ ...infoUpdate, tipe: e.target.value })}
                  className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white"
                >
                  {TIPE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <select
                  value={infoUpdate.status}
                  onChange={(e) => onChangeInfoUpdate({ ...infoUpdate, status: e.target.value })}
                  className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                <input
                  type="number"
                  value={infoUpdate.urutan}
                  onChange={(e) =>
                    onChangeInfoUpdate({ ...infoUpdate, urutan: Number(e.target.value) || 1 })
                  }
                  min={1}
                  className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-[#01793B] text-white text-sm font-medium hover:bg-emerald-700"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={onCloseEditModal}
                  className="px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SectionCard>
  );
}

"use client";

import ConfirmModal from "@/Components/Dashboard/ConfirmModal";
import { InformasiSekolahItem, uploadBlogImage } from "@/lib/client/admin";
import { Edit2, FileText, Image as ImageIcon, Search, Trash2, Upload, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<InformasiSekolahItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const suggestions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return infoList
      .filter((info) => info.judul.toLowerCase().includes(q))
      .slice(0, 6);
  }, [infoList, search]);

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

  const openDeleteModal = (info: InformasiSekolahItem) => {
    setDeleteTarget(info);
    setDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget || !onDeleteInfo) return;
    setDeleting(true);
    await onDeleteInfo(deleteTarget.info_id);
    setDeleting(false);
    setDeleteModal(false);
    setDeleteTarget(null);
  };

  const isEditOpen = editingId != null && String(editingId) === infoUpdate.info_id;

  return (
    <div className="space-y-6">
      {/* Article Form — Full Width */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">Kelola Artikel</h2>
              <p className="text-xs text-gray-500">Buat dan edit berita atau artikel sekolah</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-b border-gray-100">
          <form onSubmit={onCreate} className="space-y-4 w-full bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 border-l-4 border-emerald-500 pl-3">Form Artikel Baru</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Judul Artikel</label>
                <input
                  value={infoForm.judul}
                  onChange={(e) => onChangeInfoForm({ ...infoForm, judul: e.target.value })}
                  placeholder="Masukkan judul..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Slug (URL)</label>
                <input
                  value={infoForm.slug}
                  onChange={(e) => onChangeInfoForm({ ...infoForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  placeholder="link-artikel-anda"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-1 focus:ring-emerald-500 outline-none font-mono"
                  required
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-gray-700">Sampul & Konten</label>
                <div className="flex gap-2">
                  <label className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-700 text-xs font-bold cursor-pointer hover:bg-emerald-100 transition-all">
                    <Upload size={16} />
                    {uploadingCreate ? "..." : "Pilih File"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleCreateImageChange} disabled={uploadingCreate} />
                  </label>
                  <input
                    value={infoForm.gambar}
                    onChange={(e) => onChangeInfoForm({ ...infoForm, gambar: e.target.value })}
                    placeholder="Atau URL gambar..."
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none"
                  />
                </div>
                {infoForm.gambar && <img src={infoForm.gambar} className="h-16 rounded-lg mt-2 object-cover border border-gray-100" />}
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-gray-700">Ringkasan</label>
                <textarea
                  value={infoForm.ringkasan}
                  onChange={(e) => onChangeInfoForm({ ...infoForm, ringkasan: e.target.value })}
                  placeholder="Ringkasan singkat..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-gray-700">Konten Lengkap</label>
                <textarea
                  value={infoForm.konten}
                  onChange={(e) => onChangeInfoForm({ ...infoForm, konten: e.target.value })}
                  placeholder="Tulis artikel lengkap di sini..."
                  rows={8}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none"
                  required
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-3 sm:col-span-2 bg-slate-50 p-3 rounded-lg border border-gray-100">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Kategori</label>
                  <select
                    value={infoForm.tipe}
                    onChange={(e) => onChangeInfoForm({ ...infoForm, tipe: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs bg-white outline-none"
                  >
                    {TIPE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Status</label>
                  <select
                    value={infoForm.status}
                    onChange={(e) => onChangeInfoForm({ ...infoForm, status: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs bg-white outline-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Urutan</label>
                  <input
                    type="number"
                    value={infoForm.urutan}
                    onChange={(e) => onChangeInfoForm({ ...infoForm, urutan: Number(e.target.value) || 1 })}
                    min={1}
                    className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#01793B] text-white font-bold text-sm shadow-sm hover:bg-emerald-700 transition-all"
              >
                Simpan & Publikasikan
              </button>
            </div>
          </form>
        </div>

        {/* Search and Filters — Below Form */}
        <div className="px-6 py-4 border-b border-gray-100 bg-white space-y-3">
          <div ref={searchRef} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Cari artikel berdasarkan judul atau slug..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-gray-50/50"
            />
            {search && (
              <button
                onClick={() => { setSearch(""); setShowSuggestions(false); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
              >
                <X size={16} />
              </button>
            )}

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-gray-100 shadow-xl overflow-hidden z-30">
                <div className="px-3 py-2 border-b border-gray-50 bg-gray-50/50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Hasil Pencarian</span>
                </div>
                {suggestions.map((s) => (
                  <button
                    key={s.info_id}
                    onClick={() => {
                      setSearch(s.judul);
                      setShowSuggestions(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-emerald-50/50 transition-colors text-left border-b border-gray-50 last:border-b-0"
                  >
                    <Search size={13} className="text-gray-300 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 truncate">{s.judul}</p>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${s.status === 'published' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                      {s.status}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={filterTipe}
              onChange={(e) => setFilterTipe(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none"
            >
              <option value="">Semua Tipe</option>
              {TIPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none"
            >
              <option value="">Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            {(filterTipe || filterStatus || search) && (
              <button
                onClick={() => { setSearch(""); setFilterTipe(""); setFilterStatus(""); }}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Article List */}
        <div className="p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Daftar Artikel
            <span className="text-xs font-normal text-gray-400 ml-1">({filteredList.length} artikel)</span>
          </h3>

          {filteredList.length === 0 ? (
            <div className="py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <Search size={32} className="mx-auto text-gray-200 mb-3" />
              <p className="text-gray-400 text-sm font-medium">Belum ada artikel ditemukan.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredList.map((info) => (
                <div
                  key={info.info_id}
                  className="group flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm hover:border-emerald-200 transition-all overflow-hidden"
                >
                  <div className="aspect-video relative overflow-hidden bg-gray-100">
                    {info.gambar ? (
                      <img src={info.gambar} alt={info.judul} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon size={24} />
                      </div>
                    )}
                    <div className="absolute top-2 left-2 flex gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${info.status === 'published' ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'
                        }`}>
                        {info.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-tight mb-2">
                      {info.judul}
                    </h4>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
                      {info.ringkasan || info.konten}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
                      <button
                        onClick={() => onSelectInfo?.(info)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                      >
                        <Edit2 size={14} />
                        Edit
                      </button>
                      {onDeleteInfo && (
                        <button
                          onClick={() => openDeleteModal(info)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                          Hapus
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={deleteModal}
        title="Hapus Artikel?"
        description={deleteTarget ? `Yakin ingin menghapus artikel "${deleteTarget.judul}"? Tindakan ini tidak dapat dibatalkan.` : ""}
        confirmLabel="Hapus"
        cancelLabel="Batal"
        isDanger={true}
        isLoading={deleting}
        onClose={() => {
          setDeleteModal(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleConfirmDelete}
      />

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={onCloseEditModal}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Edit Artikel</h3>
              <button onClick={onCloseEditModal} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={onUpdate} className="overflow-y-auto p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Judul</label>
                  <input
                    value={infoUpdate.judul}
                    onChange={(e) => onChangeInfoUpdate({ ...infoUpdate, judul: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Slug</label>
                  <input
                    value={infoUpdate.slug}
                    onChange={(e) => onChangeInfoUpdate({ ...infoUpdate, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-1 focus:ring-emerald-500 outline-none font-mono"
                    required
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-700">Media</label>
                  <div className="flex gap-2">
                    <label className="shrink-0 flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 text-xs font-bold cursor-pointer transition-colors">
                      <Upload size={14} />
                      {uploadingEdit ? "..." : "Pilih"}
                      <input type="file" accept="image/*" className="hidden" onChange={handleEditImageChange} disabled={uploadingEdit} />
                    </label>
                    <input
                      value={infoUpdate.gambar}
                      onChange={(e) => onChangeInfoUpdate({ ...infoUpdate, gambar: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none"
                      placeholder="URL Gambar"
                    />
                  </div>
                  {infoUpdate.gambar && <img src={infoUpdate.gambar} alt="Preview" className="h-16 rounded-lg mt-1 object-cover border border-gray-100" />}
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-700">Ringkasan</label>
                  <textarea
                    value={infoUpdate.ringkasan}
                    onChange={(e) => onChangeInfoUpdate({ ...infoUpdate, ringkasan: e.target.value })}
                    rows={2}
                    placeholder="Ringkasan..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-700">Konten Lengkap</label>
                  <textarea
                    value={infoUpdate.konten}
                    onChange={(e) => onChangeInfoUpdate({ ...infoUpdate, konten: e.target.value })}
                    rows={8}
                    placeholder="Isi konten..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 sm:col-span-2 bg-slate-50 p-3 rounded-lg border border-gray-100">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Tipe</label>
                    <select value={infoUpdate.tipe} onChange={e => onChangeInfoUpdate({ ...infoUpdate, tipe: e.target.value })} className="w-full bg-white border border-gray-200 rounded-md text-xs px-2 py-1.5 outline-none">
                      {TIPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Status</label>
                    <select value={infoUpdate.status} onChange={e => onChangeInfoUpdate({ ...infoUpdate, status: e.target.value })} className="w-full bg-white border border-gray-200 rounded-md text-xs px-2 py-1.5 outline-none">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Urutan</label>
                    <input type="number" value={infoUpdate.urutan} onChange={e => onChangeInfoUpdate({ ...infoUpdate, urutan: Number(e.target.value) || 1 })} className="w-full bg-white border border-gray-200 rounded-md text-xs px-2 py-1.5 outline-none" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button type="submit" className="flex-1 bg-[#01793B] text-white py-2.5 rounded-lg font-bold text-sm shadow-md hover:bg-emerald-700">
                  Simpan Perubahan
                </button>
                <button type="button" onClick={onCloseEditModal} className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50">
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

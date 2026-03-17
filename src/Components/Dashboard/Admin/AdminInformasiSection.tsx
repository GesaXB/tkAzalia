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

  useEffect(() => {
    const slug = infoForm.judul
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    onChangeInfoForm({ ...infoForm, slug });
  }, [infoForm.judul]);

  useEffect(() => {
    const slug = infoUpdate.judul
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    onChangeInfoUpdate({ ...infoUpdate, slug });
  }, [infoUpdate.judul]);

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
      <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-white to-emerald-50/30">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100">
              <FileText size={20} className="text-[#01793B]" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">Kelola Artikel</h2>
              <p className="text-xs text-gray-500 mt-0.5">Buat dan edit berita atau artikel sekolah</p>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-8 border-b border-gray-100 bg-slate-50/20">
          <form onSubmit={onCreate} className="space-y-8 w-full">
            <h3 className="font-black text-slate-900 flex items-center gap-3 text-xs uppercase tracking-[0.2em] mb-4">
              <span className="w-1.5 h-4 rounded-full bg-emerald-500" />
              Tulis Sesuatu yang Baru
            </h3>
            <div className="grid gap-8 lg:grid-cols-1">
              {/* Main Content Area */}
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Judul Artikel</label>
                    <input
                      value={infoForm.judul}
                      onChange={(e) => onChangeInfoForm({ ...infoForm, judul: e.target.value })}
                      placeholder="Ketik judul yang menarik di sini..."
                      className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-base focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Slug URL (Otomatis)</label>
                    <input
                      value={infoForm.slug}
                      readOnly
                      placeholder="link-artikel-anda"
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm focus:ring-0 outline-none font-mono text-slate-500 cursor-not-allowed"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Ringkasan (Opsional)</label>
                  <textarea
                    value={infoForm.ringkasan}
                    onChange={(e) => onChangeInfoForm({ ...infoForm, ringkasan: e.target.value })}
                    placeholder="Ringkasan singkat untuk pratinjau..."
                    rows={2}
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all leading-relaxed font-medium resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Konten Lengkap</label>
                  <textarea
                    value={infoForm.konten}
                    onChange={(e) => onChangeInfoForm({ ...infoForm, konten: e.target.value })}
                    placeholder="Tulis narasi lengkap artikel Anda di sini..."
                    rows={10}
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all leading-relaxed font-medium resize-y"
                    required
                  />
                </div>

                <div className="grid lg:grid-cols-3 gap-6 items-start">
                  {/* Media */}
                  <div className="lg:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Media / Sampul</label>
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4">
                      {infoForm.gambar ? (
                        <div className="relative w-full sm:w-48 aspect-video rounded-xl overflow-hidden group shrink-0">
                          <img src={infoForm.gambar} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                          <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/40 transition-colors" />
                          <button type="button" onClick={() => onChangeInfoForm({ ...infoForm, gambar: "" })} className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="w-full sm:w-48 aspect-video rounded-xl bg-slate-50 border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-2 shrink-0">
                          <ImageIcon size={24} strokeWidth={1.5} />
                        </div>
                      )}
                      <div className="flex-1 flex flex-col justify-center gap-3">
                        <label className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 text-[11px] font-bold uppercase tracking-wider cursor-pointer transition-colors border border-slate-100">
                          <Upload size={14} />
                          {uploadingCreate ? "Mengunggah..." : "Unggah Gambar"}
                          <input type="file" accept="image/*" className="hidden" onChange={handleCreateImageChange} disabled={uploadingCreate} />
                        </label>
                        <input
                          value={infoForm.gambar}
                          onChange={(e) => onChangeInfoForm({ ...infoForm, gambar: e.target.value })}
                          placeholder="Atau tempel URL gambar..."
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Settings */}
                  <div className="space-y-4">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Pengaturan</label>
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 gap-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kategori</label>
                          <select
                            value={infoForm.tipe}
                            onChange={(e) => onChangeInfoForm({ ...infoForm, tipe: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 border-none text-xs outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold text-slate-700"
                          >
                            {TIPE_OPTIONS.map((o) => (
                              <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</label>
                          <select
                            value={infoForm.status}
                            onChange={(e) => onChangeInfoForm({ ...infoForm, status: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 border-none text-xs outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold text-slate-700"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Tampil</option>
                          </select>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 rounded-2xl bg-slate-900 text-white font-bold text-[11px] uppercase tracking-wider hover:bg-emerald-600 transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
                      >
                        <FileText size={16} />
                        Posting Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
        <div className="p-8">
          <h3 className="font-black text-slate-900 uppercase tracking-wider text-xs mb-8 flex items-center gap-3">
            <span className="w-8 h-px bg-slate-200" />
            Daftar Artikel
            <span className="text-[10px] font-bold text-slate-300 ml-1">({filteredList.length} entri)</span>
          </h3>

          {filteredList.length === 0 ? (
            <div className="py-20 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
              <Search size={40} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Tidak ada artikel ditemukan</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredList.map((info) => (
                <div
                  key={info.info_id}
                  className="group flex flex-col bg-white rounded-xl border border-slate-200 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-16/10 relative overflow-hidden bg-slate-50">
                    {info.gambar ? (
                      <img src={info.gambar} alt={info.judul} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-200">
                        <ImageIcon size={32} strokeWidth={1.5} />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider shadow-sm ${
                        info.status === 'published' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                      }`}>
                        {info.status}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[8px] font-black uppercase tracking-wider shadow-sm">
                        {info.tipe}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug mb-3 min-h-[2.8rem]">
                      {info.judul}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium line-clamp-3 leading-relaxed mb-6 italic">
                      {info.ringkasan || info.konten}
                    </p>

                    <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between group/link">
                      <button
                        onClick={() => onSelectInfo?.(info)}
                        className="text-xs font-bold text-slate-900 uppercase tracking-wider hover:text-emerald-600 transition-colors flex items-center gap-2"
                      >
                        <Edit2 size={12} />
                        Edit
                      </button>
                      <div className="flex items-center gap-2">
                        {onDeleteInfo && (
                          <button
                            onClick={() => openDeleteModal(info)}
                            className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-100 hover:border-rose-100 active:scale-95"
                            title="Hapus"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                        <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 transition-all">
                          →
                        </div>
                      </div>
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
            <form onSubmit={onUpdate} className="overflow-y-auto p-6 space-y-6">
              <div className="grid gap-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Judul Artikel</label>
                    <input
                      value={infoUpdate.judul}
                      onChange={(e) => onChangeInfoUpdate({ ...infoUpdate, judul: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-white shadow-sm text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none font-bold"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Slug URL (Otomatis)</label>
                    <input
                      value={infoUpdate.slug}
                      readOnly
                      className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-sm focus:ring-0 outline-none font-mono text-slate-500 cursor-not-allowed"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Ringkasan</label>
                  <textarea
                    value={infoUpdate.ringkasan}
                    onChange={(e) => onChangeInfoUpdate({ ...infoUpdate, ringkasan: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 shadow-sm text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Konten Lengkap</label>
                  <textarea
                    value={infoUpdate.konten}
                    onChange={(e) => onChangeInfoUpdate({ ...infoUpdate, konten: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 shadow-sm text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium resize-y"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Media</label>
                    <div className="flex gap-2">
                      <label className="shrink-0 flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-emerald-100 transition-colors">
                        <Upload size={14} />
                        {uploadingEdit ? "..." : "Pilih"}
                        <input type="file" accept="image/*" className="hidden" onChange={handleEditImageChange} disabled={uploadingEdit} />
                      </label>
                      <input
                        value={infoUpdate.gambar}
                        onChange={(e) => onChangeInfoUpdate({ ...infoUpdate, gambar: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-100 text-xs focus:ring-2 focus:ring-emerald-500/10 outline-none"
                        placeholder="URL Gambar"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 items-end">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Kategori</label>
                      <select value={infoUpdate.tipe} onChange={e => onChangeInfoUpdate({ ...infoUpdate, tipe: e.target.value })} className="w-full bg-slate-50 border-none rounded-xl text-xs px-3 py-2 font-bold outline-none ring-1 ring-slate-100">
                        {TIPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Status</label>
                      <select value={infoUpdate.status} onChange={e => onChangeInfoUpdate({ ...infoUpdate, status: e.target.value })} className="w-full bg-slate-50 border-none rounded-xl text-xs px-3 py-2 font-bold outline-none ring-1 ring-slate-100">
                        <option value="draft">Draft</option>
                        <option value="published">Tampil</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-slate-900 text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-md hover:bg-emerald-600 transition-all active:scale-95">
                  Simpan Perubahan
                </button>
                <button type="button" onClick={onCloseEditModal} className="px-8 py-3 rounded-2xl border border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors">
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


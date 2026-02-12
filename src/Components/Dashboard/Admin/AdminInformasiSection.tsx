"use client";

import { InformasiSekolahItem } from "@/lib/client/admin";
import SectionCard from "../SectionCard";

interface InfoFormState {
  judul: string;
  slug: string;
  konten: string;
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
}

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
}: AdminInformasiSectionProps) {
  return (
    <SectionCard title="Informasi Sekolah" description="Tambah atau perbarui informasi untuk landing page.">
      <div className="grid gap-6 lg:grid-cols-2">
        <form className="space-y-3" onSubmit={onCreate}>
          <h3 className="text-sm font-semibold text-gray-700">Buat Informasi Baru</h3>
          <input
            value={infoForm.judul}
            onChange={(event) => onChangeInfoForm({ ...infoForm, judul: event.target.value })}
            placeholder="Judul"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
            required
          />
          <input
            value={infoForm.slug}
            onChange={(event) => onChangeInfoForm({ ...infoForm, slug: event.target.value })}
            placeholder="Slug"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
            required
          />
          <textarea
            value={infoForm.konten}
            onChange={(event) => onChangeInfoForm({ ...infoForm, konten: event.target.value })}
            placeholder="Konten"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm min-h-[120px]"
            required
          />
          <div className="grid gap-3 sm:grid-cols-3">
            <select
              value={infoForm.tipe}
              onChange={(event) => onChangeInfoForm({ ...infoForm, tipe: event.target.value })}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
            >
              <option value="profil">profil</option>
              <option value="visi">visi</option>
              <option value="misi">misi</option>
              <option value="fasilitas">fasilitas</option>
              <option value="kontak">kontak</option>
              <option value="syarat_pendaftaran">syarat_pendaftaran</option>
            </select>
            <select
              value={infoForm.status}
              onChange={(event) => onChangeInfoForm({ ...infoForm, status: event.target.value })}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
            >
              <option value="draft">draft</option>
              <option value="published">published</option>
            </select>
            <input
              type="number"
              value={infoForm.urutan}
              onChange={(event) =>
                onChangeInfoForm({ ...infoForm, urutan: Number(event.target.value) })
              }
              placeholder="Urutan"
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
              min={1}
            />
          </div>
          <button className="px-4 py-2 rounded-lg bg-[#01793B] text-white text-sm font-medium hover:bg-emerald-700">
            Simpan Informasi
          </button>
        </form>

        <form className="space-y-3" onSubmit={onUpdate}>
          <h3 className="text-sm font-semibold text-gray-700">Perbarui Informasi</h3>
          <input
            value={infoUpdate.info_id}
            onChange={(event) => onChangeInfoUpdate({ ...infoUpdate, info_id: event.target.value })}
            placeholder="ID (atau klik item di daftar)"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50"
            readOnly
          />
          <input
            value={infoUpdate.judul}
            onChange={(event) => onChangeInfoUpdate({ ...infoUpdate, judul: event.target.value })}
            placeholder="Judul"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
            required
          />
          <input
            value={infoUpdate.slug}
            onChange={(event) => onChangeInfoUpdate({ ...infoUpdate, slug: event.target.value })}
            placeholder="Slug"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
            required
          />
          <textarea
            value={infoUpdate.konten}
            onChange={(event) => onChangeInfoUpdate({ ...infoUpdate, konten: event.target.value })}
            placeholder="Konten"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm min-h-[120px]"
            required
          />
          <div className="grid gap-3 sm:grid-cols-3">
            <select
              value={infoUpdate.tipe}
              onChange={(event) => onChangeInfoUpdate({ ...infoUpdate, tipe: event.target.value })}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
            >
              <option value="profil">profil</option>
              <option value="visi">visi</option>
              <option value="misi">misi</option>
              <option value="fasilitas">fasilitas</option>
              <option value="kontak">kontak</option>
              <option value="syarat_pendaftaran">syarat_pendaftaran</option>
            </select>
            <select
              value={infoUpdate.status}
              onChange={(event) => onChangeInfoUpdate({ ...infoUpdate, status: event.target.value })}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
            >
              <option value="draft">draft</option>
              <option value="published">published</option>
            </select>
            <input
              type="number"
              value={infoUpdate.urutan}
              onChange={(event) =>
                onChangeInfoUpdate({ ...infoUpdate, urutan: Number(event.target.value) })
              }
              placeholder="Urutan"
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
              min={1}
            />
          </div>
          <button className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-black">
            Perbarui Informasi
          </button>
        </form>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">Daftar Informasi</h3>
        {infoList.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada informasi.</p>
        ) : (
          <div className="space-y-3">
            {infoList.map((info) => (
              <div
                key={info.info_id}
                className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <button
                  type="button"
                  onClick={() => onSelectInfo?.(info)}
                  className="text-left flex-1 min-w-0"
                >
                  <p className="font-semibold text-gray-900">{info.judul}</p>
                  <p className="text-xs text-gray-500">{info.slug}</p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{info.konten}</p>
                </button>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-gray-500">{info.status}</span>
                  {onDeleteInfo && (
                    <button
                      type="button"
                      onClick={() => onDeleteInfo(info.info_id)}
                      className="px-3 py-1 text-xs rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionCard>
  );
}


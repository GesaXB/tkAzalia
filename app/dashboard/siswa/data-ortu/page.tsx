"use client";

import { getSiswaMe, updateSiswaData } from "@/lib/client/spmb";
import { getJadwalPpdb } from "@/lib/client/public";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Briefcase, CheckCircle2, Home, Phone, Save, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";

const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-4 focus:ring-[#01793B]/10 focus:border-[#01793B] outline-none transition-all disabled:bg-slate-50 disabled:text-gray-400 placeholder:text-gray-300";

function SectionHeader({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{label}</h3>
    </div>
  );
}

export default function SiswaDataOrtuPage() {
  const { error: toastError, success: toastSuccess } = useToast();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ppdbOpened, setPpdbOpened] = useState(true);
  const [form, setForm] = useState({
    nama_ayah: "",
    pekerjaan_ayah: "",
    nama_ibu: "",
    pekerjaan_ibu: "",
    no_whatsapp: "",
    alamat_rumah: "",
  });

  useEffect(() => {
    const load = async () => {
      const [res, jadwalRes] = await Promise.all([getSiswaMe(), getJadwalPpdb()]);
      if (res.success && res.data) {
        const d = res.data;
        setForm({
          nama_ayah: d.nama_ayah || "",
          pekerjaan_ayah: d.pekerjaan_ayah || "",
          nama_ibu: d.nama_ibu || "",
          pekerjaan_ibu: d.pekerjaan_ibu || "",
          no_whatsapp: d.no_whatsapp || "",
          alamat_rumah: d.alamat_rumah || "",
        });
      }
      if (jadwalRes.success) setPpdbOpened(jadwalRes.data?.dibuka === true);
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ppdbOpened) return;
    setError(null);
    setSuccess(false);
    setSaving(true);
    const res = await updateSiswaData({
      nama_ayah: form.nama_ayah || null,
      pekerjaan_ayah: form.pekerjaan_ayah || null,
      nama_ibu: form.nama_ibu || null,
      pekerjaan_ibu: form.pekerjaan_ibu || null,
      no_whatsapp: form.no_whatsapp || null,
      alamat_rumah: form.alamat_rumah || null,
    });
    setSaving(false);
    if (!res.success) {
      const msg = res.error || "Gagal menyimpan data";
      setError(msg);
      toastError(msg);
      return;
    }
    setSuccess(true);
    toastSuccess("Data orang tua berhasil diperbarui");
    setTimeout(() => setSuccess(false), 3000);
  };

  const field = (
    placeholder: string,
    value: string,
    key: keyof typeof form,
    icon: React.ReactNode,
    type = "text"
  ) => (
    <div className="relative">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300">{icon}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className={`${inputClass} pl-10`}
        disabled={!ppdbOpened}
      />
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Data Orang Tua / Wali</h1>
          <p className="text-sm text-gray-400 mt-0.5">Informasi kontak dan domisili keluarga</p>
        </div>
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-100"
            >
              <CheckCircle2 size={13} />
              Tersimpan
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <div className="flex items-center gap-3 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-2xl px-5 py-3">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      {!ppdbOpened && (
        <div className="flex items-center gap-3 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-100 rounded-2xl px-5 py-3">
          <AlertCircle size={16} className="shrink-0" />
          Periode pendaftaran SPMB telah berakhir. Data hanya bisa dilihat.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 space-y-7">
          {/* Data Ayah */}
          <div className="space-y-4">
            <SectionHeader label="Data Ayah" color="bg-emerald-500" />
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Nama Lengkap</label>
                {field("Nama lengkap ayah", form.nama_ayah, "nama_ayah", <User size={16} />)}
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Pekerjaan</label>
                {field("Pekerjaan ayah", form.pekerjaan_ayah, "pekerjaan_ayah", <Briefcase size={16} />)}
              </div>
            </div>
          </div>

          {/* Data Ibu */}
          <div className="space-y-4">
            <SectionHeader label="Data Ibu" color="bg-pink-400" />
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Nama Lengkap</label>
                {field("Nama lengkap ibu", form.nama_ibu, "nama_ibu", <User size={16} />)}
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Pekerjaan</label>
                {field("Pekerjaan ibu", form.pekerjaan_ibu, "pekerjaan_ibu", <Briefcase size={16} />)}
              </div>
            </div>
          </div>

          {/* Kontak & Domisili */}
          <div className="space-y-4">
            <SectionHeader label="Kontak & Domisili" color="bg-blue-400" />
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">No. WhatsApp</label>
                {field("08xxxxxxxxxx", form.no_whatsapp, "no_whatsapp", <Phone size={16} />, "tel")}
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Alamat Domisili</label>
                {field("Alamat lengkap", form.alamat_rumah, "alamat_rumah", <Home size={16} />)}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={saving || !ppdbOpened}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#01793B] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100 active:scale-95 disabled:opacity-50"
          >
            <Save size={15} />
            {saving ? "Menyimpan..." : ppdbOpened ? "Simpan Data" : "Ditutup"}
          </button>
        </div>
      </form>
    </div>
  );
}

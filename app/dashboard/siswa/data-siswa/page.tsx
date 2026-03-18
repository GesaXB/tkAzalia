"use client";

import { getSiswaMe, updateSiswaData } from "@/lib/client/spmb";
import { getJadwalPpdb } from "@/lib/client/public";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Baby, Calendar, CheckCircle2, MapPin, Save, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";

const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-4 focus:ring-[#01793B]/10 focus:border-[#01793B] outline-none transition-all disabled:bg-slate-50 disabled:text-gray-400 placeholder:text-gray-300";

export default function SiswaDataSiswaPage() {
  const { error: toastError, success: toastSuccess } = useToast();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ppdbOpened, setPpdbOpened] = useState(true);
  const [form, setForm] = useState({
    nama_anak: "",
    nama_panggilan: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    anak_ke: "",
  });

  useEffect(() => {
    const load = async () => {
      const [res, jadwalRes] = await Promise.all([getSiswaMe(), getJadwalPpdb()]);
      if (res.success && res.data) {
        const d = res.data;
        setForm({
          nama_anak: d.nama_anak || "",
          nama_panggilan: d.nama_panggilan || "",
          tempat_lahir: d.tempat_lahir || "",
          tanggal_lahir: d.tanggal_lahir ? d.tanggal_lahir.split("T")[0] : "",
          jenis_kelamin: d.jenis_kelamin || "",
          anak_ke: d.anak_ke ? String(d.anak_ke) : "",
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
      nama_anak: form.nama_anak || null,
      nama_panggilan: form.nama_panggilan || null,
      tempat_lahir: form.tempat_lahir || null,
      tanggal_lahir: form.tanggal_lahir || null,
      jenis_kelamin: form.jenis_kelamin || null,
      anak_ke: form.anak_ke ? Number(form.anak_ke) : null,
    });
    setSaving(false);
    if (!res.success) {
      const msg = res.error || "Gagal menyimpan data";
      setError(msg);
      toastError(msg);
      return;
    }
    setSuccess(true);
    toastSuccess("Data siswa berhasil diperbarui");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Data Calon Siswa</h1>
          <p className="text-sm text-gray-400 mt-0.5">Informasi pribadi putra/putri Anda</p>
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
        <div className="p-6 space-y-5">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Nama Lengkap Anak</label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                value={form.nama_anak}
                onChange={(e) => setForm(f => ({ ...f, nama_anak: e.target.value }))}
                placeholder="Sesuai Akta Kelahiran"
                className={`${inputClass} pl-10`}
                required
                disabled={!ppdbOpened}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Nama Panggilan */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Nama Panggilan</label>
              <div className="relative">
                <Baby size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  value={form.nama_panggilan}
                  onChange={(e) => setForm(f => ({ ...f, nama_panggilan: e.target.value }))}
                  placeholder="Nama panggilan"
                  className={`${inputClass} pl-10`}
                  disabled={!ppdbOpened}
                />
              </div>
            </div>

            {/* Anak Ke */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Anak Ke-</label>
              <input
                type="number"
                min={1}
                value={form.anak_ke}
                onChange={(e) => setForm(f => ({ ...f, anak_ke: e.target.value }))}
                placeholder="Contoh: 1"
                className={inputClass}
                disabled={!ppdbOpened}
              />
            </div>

            {/* Tempat Lahir */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Tempat Lahir</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  value={form.tempat_lahir}
                  onChange={(e) => setForm(f => ({ ...f, tempat_lahir: e.target.value }))}
                  placeholder="Kota kelahiran"
                  className={`${inputClass} pl-10`}
                  disabled={!ppdbOpened}
                />
              </div>
            </div>

            {/* Tanggal Lahir */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Tanggal Lahir</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="date"
                  value={form.tanggal_lahir}
                  onChange={(e) => setForm(f => ({ ...f, tanggal_lahir: e.target.value }))}
                  className={`${inputClass} pl-10`}
                  disabled={!ppdbOpened}
                />
              </div>
            </div>
          </div>

          {/* Jenis Kelamin */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Jenis Kelamin</label>
            <div className="flex gap-3">
              {["Laki-laki", "Perempuan"].map((jk) => (
                <button
                  key={jk}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, jenis_kelamin: jk }))}
                  disabled={!ppdbOpened}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border ${
                    form.jenis_kelamin === jk
                      ? "bg-[#01793B] border-[#01793B] text-white shadow-md shadow-emerald-100"
                      : "bg-white border-gray-200 text-gray-400 hover:border-emerald-300 hover:text-emerald-600"
                  } disabled:opacity-50`}
                >
                  {jk}
                </button>
              ))}
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

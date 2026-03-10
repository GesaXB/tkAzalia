"use client";

import { getSiswaMe, updateSiswaData } from "@/lib/client/ppdb";
import { motion } from "framer-motion";
import { AlertCircle, Baby, Calendar, CheckCircle2, MapPin, Save, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function SiswaDataSiswaPage() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
      const res = await getSiswaMe();
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
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
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
      setError(res.error || "Gagal menyimpan data");
      return;
    }
    setSuccessMessage("Data siswa berhasil diperbarui");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-outfit">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Data Calon Siswa</h1>
          <p className="text-sm text-gray-500">Lengkapi informasi pribadi putra/putri Anda</p>
        </div>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium border border-emerald-100"
          >
            <CheckCircle2 size={14} />
            {successMessage}
          </motion.div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm flex items-center gap-3">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap Anak</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={18} />
                </div>
                <input
                  value={form.nama_anak}
                  onChange={(e) => setForm(f => ({ ...f, nama_anak: e.target.value }))}
                  placeholder="Sesuai Akta Kelahiran"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Panggilan</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Baby size={18} />
                </div>
                <input
                  value={form.nama_panggilan}
                  onChange={(e) => setForm(f => ({ ...f, nama_panggilan: e.target.value }))}
                  placeholder="Nama panggilan"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Anak Ke-</label>
              <input
                type="number"
                value={form.anak_ke}
                onChange={(e) => setForm(f => ({ ...f, anak_ke: e.target.value }))}
                placeholder="Contoh: 1"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tempat Lahir</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <MapPin size={18} />
                </div>
                <input
                  value={form.tempat_lahir}
                  onChange={(e) => setForm(f => ({ ...f, tempat_lahir: e.target.value }))}
                  placeholder="Kota kelahiran"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Lahir</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Calendar size={18} />
                </div>
                <input
                  type="date"
                  value={form.tanggal_lahir}
                  onChange={(e) => setForm(f => ({ ...f, tanggal_lahir: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Jenis Kelamin</label>
              <div className="flex gap-4">
                {["Laki-laki", "Perempuan"].map((jk) => (
                  <button
                    key={jk}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, jenis_kelamin: jk }))}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all border ${form.jenis_kelamin === jk
                      ? "bg-[#01793B] border-[#01793B] text-white shadow-sm"
                      : "bg-white border-gray-200 text-gray-500 hover:border-emerald-500 hover:text-emerald-600"
                      }`}
                  >
                    {jk}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#01793B] text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-all shadow-sm disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}

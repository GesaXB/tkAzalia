"use client";

import { getSiswaMe, updateSiswaData } from "@/lib/client/ppdb";
import { motion } from "framer-motion";
import { AlertCircle, Briefcase, CheckCircle2, Home, Phone, Save, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function SiswaDataOrtuPage() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
      const res = await getSiswaMe();
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
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
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
      setError(res.error || "Gagal menyimpan data");
      return;
    }
    setSuccessMessage("Data orang tua berhasil diperbarui");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-outfit">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Data Orang Tua / Wali</h1>
          <p className="text-sm text-gray-500">Lengkapi informasi kontak dan domisili keluarga</p>
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
        <div className="p-6 md:p-8 space-y-8">
          {/* Data Ayah */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Data Ayah</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap Ayah</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    value={form.nama_ayah}
                    onChange={(e) => setForm(f => ({ ...f, nama_ayah: e.target.value }))}
                    placeholder="Nama lengkap"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pekerjaan Ayah</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Briefcase size={18} />
                  </div>
                  <input
                    value={form.pekerjaan_ayah}
                    onChange={(e) => setForm(f => ({ ...f, pekerjaan_ayah: e.target.value }))}
                    placeholder="Pekerjaan"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Data Ibu */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Data Ibu</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap Ibu</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    value={form.nama_ibu}
                    onChange={(e) => setForm(f => ({ ...f, nama_ibu: e.target.value }))}
                    placeholder="Nama lengkap"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pekerjaan Ibu</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Briefcase size={18} />
                  </div>
                  <input
                    value={form.pekerjaan_ibu}
                    onChange={(e) => setForm(f => ({ ...f, pekerjaan_ibu: e.target.value }))}
                    placeholder="Pekerjaan"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Kontak & Domisili */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Kontak & Domisili</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">No. WhatsApp Aktif</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    value={form.no_whatsapp}
                    onChange={(e) => setForm(f => ({ ...f, no_whatsapp: e.target.value }))}
                    placeholder="08xxxxxxxxxx"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Alamat Domisili</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Home size={18} />
                  </div>
                  <input
                    value={form.alamat_rumah}
                    onChange={(e) => setForm(f => ({ ...f, alamat_rumah: e.target.value }))}
                    placeholder="Alamat lengkap"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
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
            {saving ? "Menyimpan..." : "Simpan Data"}
          </button>
        </div>
      </form>
    </div>
  );
}

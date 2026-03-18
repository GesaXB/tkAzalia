"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import ConfirmModal from "@/Components/Dashboard/ConfirmModal";
import { fetchProfile } from "@/lib/client/auth";
import {
  getJadwalPpdbAdmin,
  updateJadwalPpdb,
  resetJadwalPpdb,
} from "@/lib/client/admin";
import { CalendarDays, Circle, RefreshCw, Save } from "lucide-react";

type Jadwal = {
  id: number;
  tanggal_mulai: string;
  tanggal_selesai: string;
  dibuka: boolean;
};

function formatDateLocal(iso: string) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDateDisplay(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function daysLeft(selesai: string) {
  const diff = new Date(selesai).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function AdminJadwalSpmbPage() {
  const router = useRouter();
  const { setDashboardInfo } = useDashboard();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [jadwal, setJadwal] = useState<Jadwal | null>(null);
  const [mulai, setMulai] = useState("");
  const [selesai, setSelesai] = useState("");

  useEffect(() => {
    setDashboardInfo("Jadwal SPMB", "Atur periode pendaftaran SPMB TK Azalia");
  }, [setDashboardInfo]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const profile = await fetchProfile();
      if (!profile.success || !profile.data) { router.push("/auth/login"); return; }
      if (profile.data.role !== "admin") { router.push("/dashboard/siswa"); return; }
      const res = await getJadwalPpdbAdmin();
      if (res.success && res.data) {
        setJadwal(res.data);
        setMulai(formatDateLocal(res.data.tanggal_mulai));
        setSelesai(formatDateLocal(res.data.tanggal_selesai));
      }
      setLoading(false);
    };
    load();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSaving(true);
    const res = await updateJadwalPpdb({
      tanggal_mulai: `${mulai}T00:00:00.000Z`,
      tanggal_selesai: `${selesai}T23:59:59.000Z`,
    });
    setSaving(false);
    if (!res.success) { setError(res.error || "Gagal menyimpan"); return; }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    const refreshed = await getJadwalPpdbAdmin();
    if (refreshed.success && refreshed.data) setJadwal(refreshed.data);
  };

  const handleConfirmReset = async () => {
    setError(null);
    setSaving(true);
    const res = await resetJadwalPpdb();
    setSaving(false);
    setShowResetModal(false);
    if (!res.success) { setError(res.error || "Gagal mereset"); return; }
    setJadwal(null);
    setMulai("");
    setSelesai("");
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#01793B]/20 border-t-[#01793B] rounded-full animate-spin" />
          <span className="text-sm font-medium">Memuat jadwal...</span>
        </div>
      </div>
    );
  }

  const remaining = jadwal ? daysLeft(jadwal.tanggal_selesai) : null;

  return (
    <>
      <div className="space-y-6">
        {/* Status Banner */}
        {jadwal && (
          <div className={`rounded-2xl px-6 py-5 flex items-center justify-between gap-4 border ${
            jadwal.dibuka
              ? "bg-emerald-50 border-emerald-100"
              : "bg-amber-50 border-amber-100"
          }`}>
            <div className="flex items-center gap-3">
              <Circle
                className={`w-3 h-3 fill-current ${jadwal.dibuka ? "text-emerald-500" : "text-amber-500"}`}
              />
              <div>
                <p className={`text-sm font-bold ${jadwal.dibuka ? "text-emerald-800" : "text-amber-800"}`}>
                  {jadwal.dibuka ? "Pendaftaran SPMB Sedang Dibuka" : "Pendaftaran SPMB Ditutup"}
                </p>
                <p className={`text-xs mt-0.5 ${jadwal.dibuka ? "text-emerald-600" : "text-amber-600"}`}>
                  {formatDateDisplay(jadwal.tanggal_mulai)} — {formatDateDisplay(jadwal.tanggal_selesai)}
                </p>
              </div>
            </div>
            {remaining !== null && (
              <div className="text-right shrink-0">
                <p className={`text-2xl font-black ${jadwal.dibuka ? "text-emerald-700" : "text-amber-700"}`}>
                  {remaining > 0 ? remaining : 0}
                </p>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${jadwal.dibuka ? "text-emerald-500" : "text-amber-500"}`}>
                  {remaining > 0 ? "Hari lagi" : "Sudah berakhir"}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#01793B]">
              <CalendarDays size={20} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Pengaturan Jadwal</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {jadwal ? "Ubah periode pendaftaran SPMB" : "Belum ada jadwal — atur di sini"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {error && (
              <div className="text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {error}
              </div>
            )}
            {success && (
              <div className="text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                ✓ Jadwal berhasil disimpan
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  value={mulai}
                  onChange={(e) => setMulai(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:ring-4 focus:ring-[#01793B]/10 focus:border-[#01793B] outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  value={selesai}
                  onChange={(e) => setSelesai(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm focus:ring-4 focus:ring-[#01793B]/10 focus:border-[#01793B] outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#01793B] text-white text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100 active:scale-95 disabled:opacity-60"
              >
                <Save size={14} />
                {saving ? "Menyimpan..." : "Simpan Jadwal"}
              </button>
              {jadwal && (
                <button
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 text-xs font-black uppercase tracking-widest hover:bg-red-100 transition-all active:scale-95 disabled:opacity-60"
                >
                  <RefreshCw size={14} />
                  Reset Jadwal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Info tip */}
        <p className="text-xs text-gray-400 px-1">
          Sistem otomatis mengunci pendaftaran baru jika tanggal selesai sudah terlewati atau belum ada jadwal yang diatur.
        </p>
      </div>

      <ConfirmModal
        open={showResetModal}
        title="Reset Jadwal SPMB?"
        description="Yakin ingin mereset jadwal SPMB? Semua pengaturan tanggal akan dihapus dan sistem tidak akan menerima pendaftaran baru sampai jadwal baru ditetapkan."
        confirmLabel="Reset"
        cancelLabel="Batal"
        isDanger={true}
        isLoading={saving}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleConfirmReset}
      />
    </>
  );
}

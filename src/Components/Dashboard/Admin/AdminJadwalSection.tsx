"use client";

import { useState } from "react";
import SectionCard from "../SectionCard";
import ConfirmModal from "../ConfirmModal";
import { getJadwalPpdbAdmin, updateJadwalPpdb, resetJadwalPpdb } from "@/lib/client/admin";

interface AdminJadwalSectionProps {
  jadwal: {
    id: number;
    tanggal_mulai: string;
    tanggal_selesai: string;
    dibuka: boolean;
  } | null;
  onSaved: () => void;
}

function formatDateLocal(iso: string) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function AdminJadwalSection({ jadwal, onSaved }: AdminJadwalSectionProps) {
  const [mulai, setMulai] = useState(jadwal ? formatDateLocal(jadwal.tanggal_mulai) : "");
  const [selesai, setSelesai] = useState(jadwal ? formatDateLocal(jadwal.tanggal_selesai) : "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const res = await updateJadwalPpdb({
      tanggal_mulai: `${mulai}T00:00:00.000Z`,
      tanggal_selesai: `${selesai}T23:59:59.000Z`,
    });
    setSaving(false);
    if (!res.success) {
      setError(res.error || "Gagal menyimpan");
      return;
    }
    onSaved();
  };

  const handleReset = () => {
    setShowResetModal(true);
  };

  const handleConfirmReset = async () => {
    setError(null);
    setSaving(true);
    const res = await resetJadwalPpdb();
    setSaving(false);
    if (!res.success) {
      setError(res.error || "Gagal mereset");
      setShowResetModal(false);
      return;
    }
    setMulai("");
    setSelesai("");
    setShowResetModal(false);
    onSaved();
  };

  return (
    <SectionCard
      title="Pengaturan Jadwal SPMB"
      description="Atur periode pendaftaran murid baru. Jika tanggal sudah lewat, sistem SPMB tidak akan menerima pendaftaran baru."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Tanggal Mulai</label>
            <input
              type="date"
              value={mulai}
              onChange={(e) => setMulai(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Tanggal Selesai</label>
            <input
              type="date"
              value={selesai}
              onChange={(e) => setSelesai(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              required
            />
          </div>
        </div>
        {jadwal && (
          <p className="text-xs text-gray-500">
            Status: {jadwal.dibuka ? (
              <span className="text-emerald-600 font-medium">SPMB dibuka</span>
            ) : (
              <span className="text-amber-600 font-medium">SPMB ditutup</span>
            )}
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[#01793B] px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {saving ? "Menyimpan…" : "Simpan Jadwal"}
          </button>
          {jadwal && (
            <button
              type="button"
              onClick={handleReset}
              disabled={saving}
              className="rounded-lg border border-amber-200 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50 disabled:opacity-60"
            >
              Reset Jadwal
            </button>
          )}
        </div>
      </form>

      <ConfirmModal
        open={showResetModal}
        title="Reset Jadwal SPMB?"
        description="Yakin ingin mereset jadwal SPMB? Semua pengaturan tanggal akan dihapus dan sistem SPMB tidak akan beroperasi sampai jadwal baru ditetapkan."
        confirmLabel="Reset"
        cancelLabel="Batal"
        isDanger={true}
        isLoading={saving}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleConfirmReset}
      />
    </SectionCard>
  );
}

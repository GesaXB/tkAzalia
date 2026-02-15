"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import DashboardShell from "@/Components/Dashboard/DashboardShell";
import { clearToken } from "@/lib/client/session";
import { fetchProfile } from "@/lib/client/auth";
import {
  AdminPpdbSiswa,
  getPpdbSiswaById,
  updatePpdbStatus,
  type UpdatePpdbPayload,
} from "@/lib/client/admin";
import {
  ArrowLeft,
  FileText,
  User,
  Mail,
  Phone,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  X,
} from "lucide-react";

function statusLabel(s: string) {
  const map: Record<string, string> = {
    menunggu: "Menunggu",
    lulus: "Lulus",
    tidak_lulus: "Tidak Lulus",
  };
  return map[s] ?? s;
}

function validasiBadge(s: string) {
  const styles: Record<string, string> = {
    menunggu: "bg-amber-100 text-amber-800",
    valid: "bg-emerald-100 text-emerald-800",
    tidak_valid: "bg-red-100 text-red-800",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${styles[s] ?? "bg-gray-100 text-gray-700"}`}>
      {s === "menunggu" ? "Menunggu" : s === "valid" ? "Valid" : "Tidak valid"}
    </span>
  );
}

/** Full URL untuk file di public (client-only supaya load benar) */
function useFileFullUrl(path: string | null | undefined) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!path || typeof path !== "string") {
      setUrl(null);
      return;
    }
    const p = path.startsWith("http") ? path : path.startsWith("/") ? path : `/${path}`;
    setUrl(p.startsWith("http") ? p : `${window.location.origin}${p}`);
  }, [path]);
  return url;
}

function BerkasPreviewModal({
  namaFile,
  pathFile,
  tipeFile,
  onClose,
}: {
  namaFile: string;
  pathFile: string;
  tipeFile: string;
  onClose: () => void;
}) {
  const fullUrl = useFileFullUrl(pathFile);
  const isImage = tipeFile.startsWith("image/");
  const isPdf = tipeFile === "application/pdf" || namaFile.toLowerCase().endsWith(".pdf");
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Preview berkas"
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{namaFile}</h3>
          <button type="button" onClick={onClose} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100" aria-label="Tutup">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 min-h-0 p-5 overflow-auto bg-gray-50">
          {!fullUrl ? (
            <p className="text-sm text-gray-500 text-center py-8">Memuat...</p>
          ) : isImage ? (
            <img
              src={fullUrl}
              alt={namaFile}
              className="max-w-full max-h-[70vh] w-auto mx-auto object-contain rounded-lg"
            />
          ) : isPdf ? (
            <iframe
              src={fullUrl}
              title={namaFile}
              className="w-full h-[70vh] rounded-lg border border-gray-200 bg-white"
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-gray-500">Preview tidak tersedia untuk tipe file ini.</p>
              <a
                href={fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#01793B] px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Buka di tab baru
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPpdbDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [siswa, setSiswa] = useState<AdminPpdbSiswa | null>(null);
  const [statusPpdb, setStatusPpdb] = useState<UpdatePpdbPayload["status_ppdb"]>("menunggu");
  const [catatanPpdb, setCatatanPpdb] = useState("");
  const [previewBerkas, setPreviewBerkas] = useState<{ nama_file: string; path_file: string; tipe_file: string } | null>(null);

  useEffect(() => {
    if (!Number.isInteger(id) || id < 1) {
      setError("ID tidak valid");
      setLoading(false);
      return;
    }
    const load = async () => {
      setLoading(true);
      setError(null);
      const profile = await fetchProfile();
      if (!profile.success || !profile.data) {
        router.push("/auth/login");
        return;
      }
      if (profile.data.role !== "admin") {
        router.push("/dashboard/siswa");
        return;
      }
      const res = await getPpdbSiswaById(id);
      if (!res.success) {
        setError(res.error || "Gagal memuat data peserta");
        setLoading(false);
        return;
      }
      if (!res.data) {
        setError("Peserta tidak ditemukan");
        setLoading(false);
        return;
      }
      setSiswa(res.data);
      setStatusPpdb((res.data.status_ppdb as UpdatePpdbPayload["status_ppdb"]) || "menunggu");
      setCatatanPpdb(res.data.catatan_ppdb || "");
      setLoading(false);
    };
    load();
  }, [id, router]);

  const handleLogout = () => {
    clearToken();
    router.push("/");
  };

  const handleSimpan = async () => {
    if (!siswa) return;
    setSaving(true);
    setError(null);
    const res = await updatePpdbStatus({
      siswa_id: siswa.siswa_id,
      status_ppdb: statusPpdb,
      catatan_ppdb: catatanPpdb.trim() || null,
    });
    setSaving(false);
    if (!res.success) {
      setError(res.error || "Gagal menyimpan keputusan");
      return;
    }
    setSiswa((prev) => (prev ? { ...prev, status_ppdb: statusPpdb, catatan_ppdb: catatanPpdb.trim() || null } : null));
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Memuat data peserta...
      </div>
    );
  }

  if (error && !siswa) {
    return (
      <DashboardShell
        title="PPDB"
        subtitle="Detail peserta"
        sidebarTitle="Admin Menu"
        items={[
          { label: "Ringkasan", href: "/dashboard/admin" },
          { label: "Jadwal PPDB", href: "/dashboard/admin/jadwal-ppdb" },
          { label: "Kelas PPDB", href: "/dashboard/admin/kelas" },
          { label: "PPDB", href: "/dashboard/admin/ppdb" },
          { label: "Blog", href: "/dashboard/admin/informasi" },
          { label: "Profil", href: "/dashboard/admin/profile" },
        ]}
        onLogout={handleLogout}
      >
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
        <Link
          href="/dashboard/admin/ppdb"
          className="inline-flex items-center gap-2 mt-4 text-[#01793B] font-medium hover:underline"
        >
          <ArrowLeft size={18} />
          Kembali ke daftar PPDB
        </Link>
      </DashboardShell>
    );
  }

  if (!siswa) return null;

  return (
    <DashboardShell
      title="Penerimaan PPDB"
      subtitle={`Detail peserta · ${siswa.user.nama_lengkap}`}
      sidebarTitle="Admin Menu"
      items={[
        { label: "Ringkasan", href: "/dashboard/admin" },
        { label: "Jadwal PPDB", href: "/dashboard/admin/jadwal-ppdb" },
        { label: "Kelas PPDB", href: "/dashboard/admin/kelas" },
        { label: "PPDB", href: "/dashboard/admin/ppdb" },
        { label: "Blog", href: "/dashboard/admin/informasi" },
        { label: "Profil", href: "/dashboard/admin/profile" },
      ]}
      onLogout={handleLogout}
    >
      <div className="space-y-6">
        <Link
          href="/dashboard/admin/ppdb"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#01793B]"
        >
          <ArrowLeft size={18} />
          Kembali ke daftar PPDB
        </Link>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2">
            {error}
          </div>
        )}

        {/* Profil singkat */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Data Calon Siswa
          </h2>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <span className="flex items-center gap-2 text-gray-900">
              <User size={18} className="text-gray-400" />
              {siswa.user.nama_lengkap}
            </span>
            <span className="flex items-center gap-2 text-gray-600">
              <Mail size={18} className="text-gray-400" />
              {siswa.user.email}
            </span>
            {siswa.user.no_telp && (
              <span className="flex items-center gap-2 text-gray-600">
                <Phone size={18} className="text-gray-400" />
                {siswa.user.no_telp}
              </span>
            )}
            {siswa.kelas && (
              <span className="flex items-center gap-2 text-gray-600">
                <span className="text-gray-400 font-medium">Kelas:</span>
                {siswa.kelas.nama}
              </span>
            )}
            <span className="flex items-center gap-2">
              {siswa.status_ppdb === "lulus" ? (
                <CheckCircle size={18} className="text-emerald-600" />
              ) : siswa.status_ppdb === "tidak_lulus" ? (
                <XCircle size={18} className="text-red-600" />
              ) : (
                <Clock size={18} className="text-amber-500" />
              )}
              <span className="font-medium text-gray-900">
                Status: {statusLabel(siswa.status_ppdb || "menunggu")}
              </span>
            </span>
          </div>
        </div>

        {/* Berkas: lihat file */}
        <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Berkas yang diunggah
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Periksa file untuk memastikan dokumen benar, lalu beri keputusan di bawah.
            </p>
          </div>
          <div className="divide-y divide-gray-50">
            {siswa.berkas.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-gray-500">
                Belum ada berkas diunggah.
              </div>
            ) : (
              siswa.berkas.map((b) => {
                const path = b.path_file ?? "";
                const url = path ? (path.startsWith("http") ? path : `${path.startsWith("/") ? "" : "/"}${path}`) : null;
                return (
                  <div
                    key={b.berkas_siswa_id}
                    className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 hover:bg-gray-50/50"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                        <FileText className="text-emerald-600" size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">{b.nama_file}</p>
                        <p className="text-xs text-gray-500">
                          {b.jenisBerkas?.nama_berkas ?? "-"} · {validasiBadge(b.status_validasi)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {url ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setPreviewBerkas({ nama_file: b.nama_file, path_file: path, tipe_file: b.tipe_file || "" })}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Lihat
                          </button>
                          <a
                            href={url.startsWith("http") ? url : `${typeof window !== "undefined" ? window.location.origin : ""}${url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#01793B] bg-[#01793B] px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                          >
                            Buka di tab baru
                            <ExternalLink size={14} />
                          </a>
                        </>
                      ) : (
                        <span className="text-xs text-gray-400">File tidak tersedia</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Keputusan */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Keputusan PPDB
          </h2>
          <div className="space-y-4 max-w-xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusPpdb}
                onChange={(e) => setStatusPpdb(e.target.value as UpdatePpdbPayload["status_ppdb"])}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-[#01793B]/30 focus:border-[#01793B]"
              >
                <option value="menunggu">Menunggu</option>
                <option value="lulus">Lulus</option>
                <option value="tidak_lulus">Tidak Lulus</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Catatan (opsional)</label>
              <textarea
                value={catatanPpdb}
                onChange={(e) => setCatatanPpdb(e.target.value)}
                placeholder="Catatan untuk siswa atau internal..."
                rows={3}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-[#01793B]/30 focus:border-[#01793B] resize-none"
              />
            </div>
            <button
              type="button"
              onClick={handleSimpan}
              disabled={saving}
              className="rounded-lg bg-[#01793B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {saving ? "Menyimpan..." : "Simpan keputusan"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal preview berkas - gunakan full URL agar file bisa diload */}
      {previewBerkas && previewBerkas.path_file && (
        <BerkasPreviewModal
          namaFile={previewBerkas.nama_file}
          pathFile={previewBerkas.path_file}
          tipeFile={previewBerkas.tipe_file}
          onClose={() => setPreviewBerkas(null)}
        />
      )}
    </DashboardShell>
  );
}

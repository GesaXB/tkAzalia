"use client";

import { useToast } from "@/context/ToastContext";
import {
  AdminPpdbSiswa,
  getPpdbSiswaById,
  updatePpdbStatus,
  type UpdatePpdbPayload,
} from "@/lib/client/admin";
import { fetchProfile } from "@/lib/client/auth";
import { clearToken } from "@/lib/client/session";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  ExternalLink,
  FileText,
  Mail,
  Phone,
  User,
  X,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";

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
    menunggu: "bg-amber-500 text-white",
    valid: "bg-emerald-500 text-white",
    tidak_valid: "bg-rose-500 text-white",
  };
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${styles[s] ?? "bg-slate-500 text-white"}`}>
      {s === "menunggu" ? "Menunggu" : s === "valid" ? "Valid" : "Invalid"}
    </span>
  );
}
function useFileFullUrl(path: string | null | undefined) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!path || typeof path !== "string") {
      setUrl(null);
      return;
    }
    const p = path.startsWith("http") ? path : path.startsWith("/") ? path : `/${path}`;
    const finalUrl = p.startsWith("http") ? p : `${window.location.origin}${p}`;
    console.log('File Access Debug:', { original: path, processed: p, final: finalUrl });
    setUrl(finalUrl);
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
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4 gap-4">
          <h3 className="text-lg font-semibold text-gray-900 break-words">{namaFile}</h3>
          <button type="button" onClick={onClose} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 shrink-0" aria-label="Tutup">
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

  const [validating, setValidating] = useState<number | null>(null);
  const toast = useToast();
  const { setDashboardInfo } = useDashboard();

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
      setDashboardInfo("Penerimaan PPDB", `Detail peserta · ${res.data.user.nama_lengkap}`);
      setLoading(false);
    };
    load();
  }, [id, router, setDashboardInfo]);

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
      const msg = res.error || "Gagal menyimpan keputusan";
      setError(msg);
      toast.error(msg);
      return;
    }
    setSiswa((prev) => (prev ? { ...prev, status_ppdb: statusPpdb, catatan_ppdb: catatanPpdb.trim() || null } : null));
    toast.success("Keputusan berhasil disimpan");
  };

  const handleValidasi = async (berkasId: number, status: 'valid' | 'tidak_valid') => {
    if (!siswa) return;
    setValidating(berkasId);

    const { updateBerkasValidasi } = await import("@/lib/client/admin");

    const res = await updateBerkasValidasi({
      berkas_siswa_id: berkasId,
      status_validasi: status,
    });

    setValidating(null);

    if (!res.success) {
      toast.error(res.error || "Gagal memvalidasi berkas");
      return;
    }

    setSiswa(prev => {
      if (!prev) return null;
      return {
        ...prev,
        berkas: prev.berkas.map(b =>
          b.berkas_siswa_id === berkasId
            ? { ...b, status_validasi: status }
            : b
        )
      };
    });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Memuat data peserta...
      </div>
    );
  }

  if (error && !siswa) {
    setDashboardInfo("PPDB", "Detail peserta");
    return (
      <div className="space-y-6">
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
      </div>
    );
  }

  if (!siswa) return null;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/dashboard/admin/ppdb"
            className="group inline-flex items-center gap-3 text-sm font-bold text-slate-500 hover:text-slate-900 transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:border-slate-900 transition-colors">
              <ArrowLeft size={16} />
            </div>
            Kembali ke Daftar
          </Link>

          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 font-black text-[10px] uppercase tracking-wider shadow-sm transition-all ${
              siswa.status_ppdb === "lulus" ? "bg-emerald-50 text-emerald-600 border-emerald-600/20" :
              siswa.status_ppdb === "tidak_lulus" ? "bg-rose-50 text-rose-600 border-rose-600/20" :
              "bg-amber-50 text-amber-600 border-amber-600/20"
            }`}>
              {siswa.status_ppdb === "lulus" ? <CheckCircle size={14} /> : 
               siswa.status_ppdb === "tidak_lulus" ? <XCircle size={14} /> : 
               <Clock size={14} />}
              Keputusan: {statusLabel(siswa.status_ppdb || "menunggu")}
            </div>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2">
            {error}
          </div>
        )}

        {/* Profil singkat & Data Orang Tua */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Data Calon Siswa */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Data Calon Siswa */}
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-8">
              Data Calon Siswa
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-1">
                  <User size={28} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nama Lengkap</p>
                  <p className="text-xl font-bold text-slate-900 break-words">{siswa.nama_anak || siswa.user.nama_lengkap}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Jenis Kelamin</p>
                  <p className="font-bold text-slate-900">{siswa.jenis_kelamin || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pilihan Kelas</p>
                  <p className="font-bold text-emerald-600">{siswa.kelas?.nama || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tempat Lahir</p>
                  <p className="font-bold text-slate-900">{siswa.tempat_lahir || "-"}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tanggal Lahir</p>
                  <p className="font-bold text-slate-900">{siswa.tanggal_lahir ? new Date(siswa.tanggal_lahir).toLocaleDateString("id-ID") : "-"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Orang Tua */}
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-8">
              Data Orang Tua / Wali
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 flex-1">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Ayah</p>
                <p className="font-bold text-slate-900">{siswa.nama_ayah || "-"}</p>
                <p className="text-[10px] text-slate-500 italic mt-1">{siswa.pekerjaan_ayah || "-"}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Ibu</p>
                <p className="font-bold text-slate-900">{siswa.nama_ibu || "-"}</p>
                <p className="text-[10px] text-slate-500 italic mt-1">{siswa.pekerjaan_ibu || "-"}</p>
              </div>
              <div className="sm:col-span-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Kontak & Alamat</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-600">
                    <Phone size={14} />
                  </div>
                  <p className="font-bold text-slate-900">{siswa.no_whatsapp || siswa.user.no_telp || "-"}</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                    <Mail size={14} />
                  </div>
                  <p className="text-sm font-medium text-slate-600">{siswa.user.email}</p>
                </div>
                <p className="text-[11px] text-slate-500 mt-4 pt-4 border-t border-slate-200/60 leading-relaxed font-medium">
                  {siswa.alamat_rumah || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Berkas: lihat file */}
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="px-8 py-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-50 text-slate-400">
                <FileText size={20} />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">Berkas Persyaratan</h2>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mt-0.5">Validasi Dokumen Peserta</p>
              </div>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {siswa.berkas.length === 0 ? (
              <div className="px-8 py-16 text-center bg-slate-50/20">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Belum ada berkas diunggah</p>
              </div>
            ) : (
              siswa.berkas.map((b) => {
                const path = b.path_file ?? "";
                const url = path ? (path.startsWith("http") ? path : `${path.startsWith("/") ? "" : "/"}${path}`) : null;
                const isValidating = validating === b.berkas_siswa_id;

                return (
                  <div
                    key={b.berkas_siswa_id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-8 py-5 hover:bg-slate-50/50 transition-colors group"
                  >
                    <div className="flex items-center gap-5 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                        <FileText size={24} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-start gap-2 mb-1 flex-col sm:flex-row sm:items-center">
                          <p className="font-bold text-slate-900 break-words line-clamp-2">{b.nama_file}</p>
                          {validasiBadge(b.status_validasi)}
                        </div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">
                          {b.jenisBerkas?.nama_berkas || "Dokumen"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">
                        {b.status_validasi !== 'valid' && (
                          <button
                            type="button"
                            disabled={isValidating}
                            onClick={() => handleValidasi(b.berkas_siswa_id, 'valid')}
                            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 disabled:opacity-50 uppercase tracking-wider px-2"
                          >
                            {isValidating ? '...' : 'Valid'}
                          </button>
                        )}
                        {b.status_validasi !== 'tidak_valid' && (
                          <button
                            type="button"
                            disabled={isValidating}
                            onClick={() => handleValidasi(b.berkas_siswa_id, 'tidak_valid')}
                            className="text-xs font-bold text-rose-600 hover:text-rose-700 disabled:opacity-50 uppercase tracking-wider px-2"
                          >
                            {isValidating ? '...' : 'Invalid'}
                          </button>
                        )}
                      </div>

                      {url ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setPreviewBerkas({ nama_file: b.nama_file, path_file: path, tipe_file: b.tipe_file || "" })}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-wider active:scale-95"
                          >
                            Preview
                          </button>
                          <a
                            href={url.startsWith("http") ? url : `${typeof window !== "undefined" ? window.location.origin : ""}${url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600 transition-all uppercase tracking-wider active:scale-95 shadow-sm"
                          >
                            Buka
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-slate-300 uppercase">File Kosong</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Keputusan */}
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-8">
            Keputusan Akhir PPDB
          </h2>
          <div className="space-y-6 max-w-2xl">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status Penerimaan</label>
                <select
                  value={statusPpdb}
                  onChange={(e) => setStatusPpdb(e.target.value as UpdatePpdbPayload["status_ppdb"])}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold"
                >
                  <option value="menunggu">Menunggu</option>
                  <option value="lulus">Lulus (Diterima)</option>
                  <option value="tidak_lulus">Tidak Lulus (Ditolak)</option>
                </select>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Catatan Tambahan (Opsional)</label>
              <textarea
                value={catatanPpdb}
                onChange={(e) => setCatatanPpdb(e.target.value)}
                placeholder="Tulis pesan atau alasan keputusan di sini..."
                rows={4}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium resize-none leading-relaxed"
              />
            </div>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleSimpan}
                disabled={saving}
                className="rounded-xl bg-slate-900 px-10 py-3 text-xs font-bold text-white hover:bg-emerald-600 disabled:opacity-60 transition-all uppercase tracking-wider shadow-sm active:scale-95"
              >
                {saving ? "Memproses..." : "Simpan Keputusan"}
              </button>
            </div>
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
    </div>
  );
}


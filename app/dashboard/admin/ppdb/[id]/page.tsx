"use client";

import { useDashboard } from "@/context/DashboardContext";
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

function DetailItem({ label, value, isCopyable }: { label: string; value?: string | null; isCopyable?: boolean }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-slate-700">{value || "-"}</p>
        {isCopyable && value && (
          <button 
            onClick={() => {
              navigator.clipboard.writeText(value);
              // Basic feedback could be added here if needed
            }}
            className="text-slate-300 hover:text-emerald-600 transition-colors"
            title="Salin"
          >
            <ExternalLink size={12} />
          </button>
        )}
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
  const { setDashboardInfo } = useDashboard();

  const [validating, setValidating] = useState<number | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (siswa) {
      setDashboardInfo("Penerimaan PPDB", `Detail peserta · ${siswa.user.nama_lengkap}`);
    } else {
      setDashboardInfo("Penerimaan PPDB", "Detail peserta");
    }
  }, [siswa, setDashboardInfo]);

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
  }, [id, router, setDashboardInfo]);

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
    return (
      <>
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
      </>
    );
  }

  if (!siswa) return null;

  return (
    <>
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

        {/* Status Keputusan Ringkas */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <span className="flex items-center gap-2 text-gray-900 font-bold">
                <User size={18} className="text-gray-400" />
                {siswa.nama_anak || siswa.user.nama_lengkap}
              </span>
              <span className="flex items-center gap-2 text-gray-600">
                <Mail size={18} className="text-gray-400" />
                {siswa.user.email}
              </span>
              <span className="flex items-center gap-2">
                {siswa.status_ppdb === "lulus" ? (
                  <CheckCircle size={18} className="text-emerald-600" />
                ) : siswa.status_ppdb === "tidak_lulus" ? (
                  <XCircle size={18} className="text-red-600" />
                ) : (
                  <Clock size={18} className="text-amber-500" />
                )}
                <span className="font-medium text-gray-900 capitalize">
                  Status: {statusLabel(siswa.status_ppdb || "menunggu")}
                </span>
              </span>
            </div>
            {siswa.kelas && (
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white uppercase tracking-wider">
                Kelas: {siswa.kelas.nama}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Detail Calon Siswa */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm space-y-5">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
              Data Calon Siswa
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <DetailItem label="Nama Lengkap" value={siswa.nama_anak || siswa.user.nama_lengkap} />
              <DetailItem label="Nama Panggilan" value={siswa.nama_panggilan} />
              <DetailItem 
                label="Tempat, Tanggal Lahir" 
                value={`${siswa.tempat_lahir || "-"}${siswa.tanggal_lahir ? `, ${new Date(siswa.tanggal_lahir).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}` : ""}`} 
              />
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="Jenis Kelamin" value={siswa.jenis_kelamin === "L" ? "Laki-laki" : siswa.jenis_kelamin === "P" ? "Perempuan" : "-"} />
                <DetailItem label="Anak Ke" value={siswa.anak_ke?.toString()} />
              </div>
            </div>
          </div>

          {/* Data Orang Tua */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm space-y-5">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
              Data Orang Tua / Wali
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem label="Nama Ayah" value={siswa.nama_ayah} />
                <DetailItem label="Pekerjaan Ayah" value={siswa.pekerjaan_ayah} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem label="Nama Ibu" value={siswa.nama_ibu} />
                <DetailItem label="Pekerjaan Ibu" value={siswa.pekerjaan_ibu} />
              </div>
              <DetailItem label="No. WhatsApp" value={siswa.no_whatsapp || siswa.user.no_telp} isCopyable />
              <DetailItem label="Alamat Rumah" value={siswa.alamat_rumah} />
            </div>
          </div>
        </div>

        {/* Berkas: lihat file */}
        <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Berkas yang diunggah
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Periksa file untuk memastikan dokumen benar, lalu beri keputusan validasi.
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
                const isValidating = validating === b.berkas_siswa_id;

                return (
                  <div
                    key={b.berkas_siswa_id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4 hover:bg-gray-50/50"
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

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <div className="flex items-center gap-1 mr-2">
                        {b.status_validasi !== 'valid' && (
                          <button
                            type="button"
                            disabled={isValidating}
                            onClick={() => handleValidasi(b.berkas_siswa_id, 'valid')}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 disabled:opacity-50 transition-colors"
                          >
                            {isValidating ? '...' : 'Set Valid'}
                          </button>
                        )}
                        {b.status_validasi !== 'tidak_valid' && (
                          <button
                            type="button"
                            disabled={isValidating}
                            onClick={() => handleValidasi(b.berkas_siswa_id, 'tidak_valid')}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 disabled:opacity-50 transition-colors"
                          >
                            {isValidating ? '...' : 'Set Invalid'}
                          </button>
                        )}
                      </div>

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
                            Buka
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
    </>
  );
}


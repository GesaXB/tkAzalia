"use client";

import { useDashboard } from "@/context/DashboardContext";
import { useToast } from "@/context/ToastContext";
import {
  AdminPpdbSiswa,
  getPpdbSiswaById,
  updatePpdbStatus,
  type UpdatePpdbPayload,
} from "@/lib/client/admin";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  ExternalLink,
  FileText,
  Home,
  Mail,
  Phone,
  User,
  X,
  XCircle
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
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

export default function AdminPpdbDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const { setDashboardInfo } = useDashboard();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [siswa, setSiswa] = useState<AdminPpdbSiswa | null>(null);
  const [statusPpdb, setStatusPpdb] = useState<UpdatePpdbPayload["status_ppdb"]>("menunggu");
  const [catatanPpdb, setCatatanPpdb] = useState("");
  const [previewBerkas, setPreviewBerkas] = useState<{ nama_file: string; path_file: string; tipe_file: string } | null>(null);

  const [validating, setValidating] = useState<number | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (siswa) {
      setDashboardInfo("Penerimaan PPDB", `Detail peserta · ${siswa.user.nama_lengkap}`);
    } else {
      setDashboardInfo("Penerimaan PPDB", "Detail peserta");
    }
  }, [siswa]);

  useEffect(() => {
    if (!Number.isInteger(id) || id < 1) {
      setError("ID tidak valid");
      setLoading(false);
      return;
    }
    const load = async () => {
      setLoading(true);
      setError(null);
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
  }, [id]);

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
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500 font-outfit">
        Memuat data peserta...
      </div>
    );
  }

  if (error && !siswa) {
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
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-50 pb-2">
          Data Calon Siswa
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase">Informasi Dasar</p>
            <div className="space-y-2">
              <span className="flex items-center gap-2 text-gray-900 text-sm">
                <User size={16} className="text-gray-400" />
                <span className="font-medium">{siswa.nama_anak || siswa.user.nama_lengkap}</span>
              </span>
              <span className="flex items-center gap-2 text-gray-600 text-sm">
                <Mail size={16} className="text-gray-400" />
                {siswa.user.email}
              </span>
              <span className="flex items-center gap-2 text-gray-600 text-sm">
                <Phone size={16} className="text-gray-400" />
                {siswa.no_whatsapp || siswa.user.no_telp || "-"}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase">Detail Kelahiran</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 font-outfit">
                <span className="text-gray-400 mr-2">Tempat:</span>
                {siswa.tempat_lahir || "-"}
              </p>
              <p className="text-sm text-gray-600 font-outfit">
                <span className="text-gray-400 mr-2">Tanggal:</span>
                {siswa.tanggal_lahir ? new Date(siswa.tanggal_lahir).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}
              </p>
              <p className="text-sm text-gray-600 font-outfit">
                <span className="text-gray-400 mr-2">Gender:</span>
                {siswa.jenis_kelamin || "-"}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase">Status Pendaftaran</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 font-outfit">
                <span className="text-gray-400 mr-2">Kelas:</span>
                {siswa.kelas?.nama || "-"}
              </p>
              <span className="flex items-center gap-2 text-sm">
                {siswa.status_ppdb === "lulus" ? (
                  <CheckCircle size={16} className="text-emerald-600" />
                ) : siswa.status_ppdb === "tidak_lulus" ? (
                  <XCircle size={16} className="text-red-600" />
                ) : (
                  <Clock size={16} className="text-amber-500" />
                )}
                <span className="font-medium text-gray-900 font-outfit">
                  {statusLabel(siswa.status_ppdb || "menunggu")}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Orang Tua / Wali */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-50 pb-2">
          Data Orang Tua / Wali
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <User size={16} className="text-blue-600" />
              </div>
              <p className="text-sm font-bold text-gray-700 font-outfit">Data Ayah</p>
            </div>
            <div className="space-y-2 pl-1 font-outfit">
              <p className="text-sm"><span className="text-gray-400 inline-block w-24">Nama:</span> <span className="font-medium text-gray-900">{siswa.nama_ayah || "-"}</span></p>
              <p className="text-sm"><span className="text-gray-400 inline-block w-24">Pekerjaan:</span> <span className="text-gray-600">{siswa.pekerjaan_ayah || "-"}</span></p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
              <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center">
                <User size={16} className="text-pink-600" />
              </div>
              <p className="text-sm font-bold text-gray-700 font-outfit">Data Ibu</p>
            </div>
            <div className="space-y-2 pl-1 font-outfit">
              <p className="text-sm"><span className="text-gray-400 inline-block w-24">Nama:</span> <span className="font-medium text-gray-900">{siswa.nama_ibu || "-"}</span></p>
              <p className="text-sm"><span className="text-gray-400 inline-block w-24">Pekerjaan:</span> <span className="text-gray-600">{siswa.pekerjaan_ibu || "-"}</span></p>
            </div>
          </div>

          <div className="sm:col-span-2 grid sm:grid-cols-2 gap-8 pt-2 border-t border-gray-50 font-outfit">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Kontak & Alamat</p>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">No. WhatsApp</p>
                  <p className="text-sm font-medium text-gray-900">{siswa.no_whatsapp || "-"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-2">
                <Home size={16} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Alamat Lengkap</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{siswa.alamat_rumah || "-"}</p>
                </div>
              </div>
            </div>
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

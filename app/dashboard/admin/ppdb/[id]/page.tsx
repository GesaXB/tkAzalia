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
  Home,
  Mail,
  Phone,
  Printer,
  Download,
  User,
  X,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

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
      setDashboardInfo("Penerimaan SPMB", `Detail peserta · ${siswa.user.nama_lengkap}`);
    } else {
      setDashboardInfo("Penerimaan SPMB", "Detail peserta");
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

  const handleExportExcel = async () => {
    if (!siswa) return;
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Detail Pendaftar');

      // Styling Header & Title
      worksheet.mergeCells('A1:B1');
      worksheet.getCell('A1').value = 'BIODATA PENDAFTAR TK AZALIA';
      worksheet.getCell('A1').font = { size: 14, bold: true };
      worksheet.getCell('A1').alignment = { horizontal: 'center' };

      worksheet.addRow([]); // Gap

      // Data Rows
      const addDataRow = (label: string, value: any) => {
        const row = worksheet.addRow([label.toUpperCase(), value || "-"]);
        row.getCell(1).font = { bold: true };
        row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF9FAFB' } }; // Light gray
        row.height = 20;
      };

      addDataRow('ID Pendaftaran', `SPMB-2026-${String(siswa.siswa_id).padStart(4, "0")}`);
      addDataRow('Nama Lengkap', siswa.nama_anak || siswa.user.nama_lengkap);
      addDataRow('Nama Panggilan', siswa.nama_panggilan);
      addDataRow('Tempat Lahir', siswa.tempat_lahir);
      addDataRow('Tanggal Lahir', siswa.tanggal_lahir ? new Date(siswa.tanggal_lahir).toLocaleDateString('id-ID') : "-");
      addDataRow('Jenis Kelamin', siswa.jenis_kelamin === "L" || siswa.jenis_kelamin === "Laki-laki" ? "Laki-laki" : "Perempuan");
      addDataRow('Anak Ke', siswa.anak_ke);
      addDataRow('Pilihan Kelas', siswa.kelas?.nama || "Belum dipilih");
      
      worksheet.addRow([]); // Gap
      addDataRow('DATA ORANG TUA', '');
      worksheet.lastRow!.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF01793B' } };
      worksheet.lastRow!.getCell(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

      addDataRow('Nama Ayah', siswa.nama_ayah);
      addDataRow('Pekerjaan Ayah', siswa.pekerjaan_ayah);
      addDataRow('Nama Ibu', siswa.nama_ibu);
      addDataRow('Pekerjaan Ibu', siswa.pekerjaan_ibu);
      addDataRow('No. WhatsApp', siswa.no_whatsapp || siswa.user.no_telp);
      addDataRow('Alamat', siswa.alamat_rumah);
      
      worksheet.addRow([]);
      addDataRow('Status PPDB', (siswa.status_ppdb || "menunggu").toUpperCase());

      // Column widths
      worksheet.getColumn(1).width = 25;
      worksheet.getColumn(2).width = 50;

      // All borders
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 2) {
            row.eachCell(cell => {
                cell.border = {
                    top: {style:'thin'}, left: {style:'thin'}, bottom: {style:'thin'}, right: {style:'thin'}
                };
            });
        }
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Profil_${siswa.nama_anak || "Siswa"}_Azalia.xlsx`);
    } catch (err) {
      console.error('Export detail error:', err);
    }
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
          Kembali ke daftar SPMB
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
          Kembali ke daftar SPMB
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
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleExportExcel}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-95"
              >
                <Download size={16} className="text-[#01793B]" />
                Export Excel
              </button>
              {siswa.kelas && (
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white uppercase tracking-wider">
                  Kelas: {siswa.kelas.nama}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Detail Calon Siswa */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <User size={20} />
              </div>
              <h2 className="text-base font-bold text-gray-900">Data Calon Siswa</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-5">
              <DetailItem label="Nama Lengkap" value={siswa.nama_anak || siswa.user.nama_lengkap} />
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="Nama Panggilan" value={siswa.nama_panggilan} />
                <DetailItem label="Jenis Kelamin" value={siswa.jenis_kelamin === "Laki-laki" || siswa.jenis_kelamin === "L" ? "Laki-laki" : siswa.jenis_kelamin === "Perempuan" || siswa.jenis_kelamin === "P" ? "Perempuan" : "-"} />
              </div>
              <DetailItem 
                label="Tempat, Tanggal Lahir" 
                value={`${siswa.tempat_lahir || "-"}${siswa.tanggal_lahir ? `, ${new Date(siswa.tanggal_lahir).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}` : ""}`} 
              />
              <DetailItem label="Anak Ke" value={siswa.anak_ke?.toString()} />
            </div>
          </div>

          {/* Data Orang Tua & Kontak */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <Home size={20} />
              </div>
              <h2 className="text-base font-bold text-gray-900">Data Orang Tua & Kontak</h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <DetailItem label="Nama Ayah" value={siswa.nama_ayah} />
                <DetailItem label="Pekerjaan Ayah" value={siswa.pekerjaan_ayah} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <DetailItem label="Nama Ibu" value={siswa.nama_ibu} />
                <DetailItem label="Pekerjaan Ibu" value={siswa.pekerjaan_ibu} />
              </div>
              
              <div className="pt-4 border-t border-gray-50">
                <div className="bg-slate-50 rounded-xl p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white shadow-xs text-emerald-600">
                      <Phone size={16} />
                    </div>
                    <DetailItem label="No. WhatsApp (Orang Tua)" value={siswa.no_whatsapp || siswa.user.no_telp} isCopyable />
                  </div>
                  <DetailItem label="Alamat Domisili" value={siswa.alamat_rumah} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Berkas Section */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <FileText size={18} className="text-gray-400" />
                Validasi Berkas
              </h2>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {siswa.berkas.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-gray-500">
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
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 hover:bg-gray-50/30 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-gray-200">
                        <FileText className="text-slate-600" size={24} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{b.nama_file}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                          <span className="font-medium text-slate-700">{b.jenisBerkas?.nama_berkas ?? "-"}</span>
                          <span>•</span>
                          {validasiBadge(b.status_validasi)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-start sm:self-auto">
                      <div className="flex items-center gap-2 mr-2">
                        {b.status_validasi !== 'valid' && (
                          <button
                            type="button"
                            disabled={isValidating}
                            onClick={() => handleValidasi(b.berkas_siswa_id, 'valid')}
                            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-100 disabled:opacity-50 transition-all active:scale-95"
                          >
                            Set Valid
                          </button>
                        )}
                        {b.status_validasi !== 'tidak_valid' && (
                          <button
                            type="button"
                            disabled={isValidating}
                            onClick={() => handleValidasi(b.berkas_siswa_id, 'tidak_valid')}
                            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-700 hover:bg-red-600 hover:text-white border border-red-100 disabled:opacity-50 transition-all active:scale-95"
                          >
                            Set Invalid
                          </button>
                        )}
                      </div>

                      {url ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setPreviewBerkas({ nama_file: b.nama_file, path_file: path, tipe_file: b.tipe_file || "" })}
                            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-xs"
                          >
                            Preview
                          </button>
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

        {/* Keputusan PPDB */}
        <div className="max-w-2xl">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 flex items-center gap-2">
              <CheckCircle size={18} className="text-[#01793B]" />
              Keputusan SPMB
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4 sm:col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase">Status Kelulusan</label>
                <select
                  value={statusPpdb}
                  onChange={(e) => setStatusPpdb(e.target.value as UpdatePpdbPayload["status_ppdb"])}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium bg-white focus:ring-4 focus:ring-[#01793B]/10 focus:border-[#01793B] outline-none transition-all"
                >
                  <option value="menunggu">Menunggu</option>
                  <option value="lulus">Lulus (Diterima)</option>
                  <option value="tidak_lulus">Tidak Lulus (Ditolak)</option>
                </select>
              </div>
              <div className="space-y-4 sm:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase">Catatan Tambahan</label>
                <textarea
                  value={catatanPpdb}
                  onChange={(e) => setCatatanPpdb(e.target.value)}
                  placeholder="Beri alasan kelulusan atau instruksi selanjutnya..."
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm bg-white focus:ring-4 focus:ring-[#01793B]/10 focus:border-[#01793B] outline-none transition-all resize-none"
                />
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-50">
              <button
                type="button"
                onClick={handleSimpan}
                disabled={saving}
                className="w-full sm:w-auto rounded-xl bg-[#01793B] px-8 py-3 text-sm font-bold text-white hover:bg-emerald-700 shadow-md shadow-emerald-900/10 transition-all active:scale-95 disabled:opacity-50"
              >
                {saving ? "Menyimpan..." : "Simpan Keputusan Final"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal preview berkas */}
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


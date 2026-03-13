"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StatCard from "./StatCard";
import { clearToken } from "@/lib/client/session";
import { fetchProfile } from "@/lib/client/auth";
import { listPpdbSiswa, listInformasiSekolah } from "@/lib/client/admin";
import { Users, FileText, User } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

export default function AdminDashboard() {
  const router = useRouter();
  const { setDashboardInfo } = useDashboard();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPpdb, setTotalPpdb] = useState(0);
  const [menungguCount, setMenungguCount] = useState(0);
  const [lulusCount, setLulusCount] = useState(0);
  const [tidakLulusCount, setTidakLulusCount] = useState(0);
  const [totalInfo, setTotalInfo] = useState(0);

  const [filterTahun, setFilterTahun] = useState<string>("");
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [basePpdbList, setBasePpdbList] = useState<any[]>([]);

  useEffect(() => {
    setDashboardInfo("Ringkasan Admin", "Kelola PPDB dan informasi sekolah");
  }, [setDashboardInfo]);

  useEffect(() => {
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
      const [ppdbResponse, infoResponse] = await Promise.all([
        listPpdbSiswa(),
        listInformasiSekolah(),
      ]);
      if (!ppdbResponse.success) setError(ppdbResponse.error || "Gagal memuat PPDB");
      if (!infoResponse.success) setError(infoResponse.error || "Gagal memuat informasi");
      
      const ppdbList = ppdbResponse.data || [];
      setBasePpdbList(ppdbList);
      
      const years = ppdbList.map((item: any) => new Date(item.user.created_at).getFullYear().toString());
      setAvailableYears(Array.from(new Set<string>(years)).sort((a, b) => b.localeCompare(a)));

      setTotalInfo((infoResponse.data || []).length);
      setLoading(false);
    };
    load();
  }, [router]);

  useEffect(() => {
    let filteredList = basePpdbList;
    if (filterTahun) {
      filteredList = filteredList.filter(
        (item: any) => new Date(item.user.created_at).getFullYear().toString() === filterTahun
      );
    }
    setTotalPpdb(filteredList.length);
    setMenungguCount(filteredList.filter((s: any) => s.status_ppdb === "menunggu").length);
    setLulusCount(filteredList.filter((s: any) => s.status_ppdb === "lulus").length);
    setTidakLulusCount(filteredList.filter((s: any) => s.status_ppdb === "tidak_lulus").length);
  }, [basePpdbList, filterTahun]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500 font-medium font-outfit">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <span>Memuat dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2 mb-6">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between mb-4 mt-6">
        <h2 className="text-sm font-bold text-slate-900">Statistik PPDB</h2>
        <select
          value={filterTahun}
          onChange={(e) => setFilterTahun(e.target.value)}
          className="px-4 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-slate-700"
        >
          <option value="">Semua Tahun</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Calon PPDB"
          value={totalPpdb}
          href="/dashboard/admin/ppdb"
          icon={<Users className="h-6 w-6" />}
        />
        <StatCard
          title="Menunggu Verifikasi"
          value={menungguCount}
          href="/dashboard/admin/ppdb"
          description="Status pending"
          variant="warning"
        />
        <StatCard
          title="Lulus"
          value={lulusCount}
          href="/dashboard/admin/ppdb"
          variant="success"
        />
        <StatCard
          title="Tidak Lulus"
          value={tidakLulusCount}
          href="/dashboard/admin/ppdb"
          variant="danger"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        <StatCard
          title="Informasi Sekolah"
          value={totalInfo}
          href="/dashboard/admin/informasi"
          icon={<FileText className="h-5 w-5" />}
          description="Kelola artikel dan konten website"
        />
        
        <Link
          href="/dashboard/admin/profile"
          className="group relative flex flex-col justify-between p-6 rounded-xl border border-slate-200 bg-white hover:border-emerald-500/30 transition-all duration-300"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Akun Saya</p>
              <p className="text-xl font-black text-slate-900 leading-tight">Profil Admin</p>
              <p className="text-[11px] text-slate-400 mt-2 font-medium leading-relaxed">Lihat & kelola kredensial akun</p>
            </div>
            <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-slate-50 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
              <User className="h-5 w-5" />
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between group/link">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider group-hover:text-emerald-600 transition-colors">
              Pengaturan Profil
            </span>
            <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover/link:bg-emerald-50 group-hover/link:text-emerald-600 transition-all">
              →
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}


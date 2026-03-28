"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchProfile } from "@/lib/client/auth";
import { listPpdbSiswa, listInformasiSekolah } from "@/lib/client/admin";
import { Users, FileText, Clock, CheckCircle, XCircle, ArrowRight, TrendingUp } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Trend Chart Component
function TrendChart({ data }: { data: any[] }) {
  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <p className="text-sm text-slate-400">Belum ada data tren pendaftaran</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#01793B" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#01793B" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
          />
          <Tooltip 
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                return payload[0].payload.fullName;
              }
              return label;
            }}
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              fontSize: '12px',
              fontWeight: '600',
              padding: '8px 12px'
            }}
            labelStyle={{ color: '#01793B', marginBottom: '4px' }}
          />
          <Area 
            type="monotone" 
            dataKey="total" 
            stroke="#01793B" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorTotal)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Simple SVG donut chart — no library needed
function DonutChart({
  menunggu,
  lulus,
  tidakLulus,
  total,
}: {
  menunggu: number;
  lulus: number;
  tidakLulus: number;
  total: number;
}) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const cx = 72;
  const cy = 72;

  // Segments: lulus (emerald), menunggu (amber), tidakLulus (rose)
  const empty = total === 0;
  const lulusP = empty ? 0 : lulus / total;
  const menungguP = empty ? 0 : menunggu / total;
  const tidakLulusP = empty ? 0 : tidakLulus / total;

  // Converting to stroke-dasharray offsets
  const lulusDash = lulusP * circ;
  const menungguDash = menungguP * circ;
  const tidakLulusDash = tidakLulusP * circ;

  const lulusOffset = 0;
  const menungguOffset = -(lulusDash);
  const tidakLulusOffset = -(lulusDash + menungguDash);

  return (
    <svg width={144} height={144} viewBox="0 0 144 144" className="shrink-0">
      {/* Background ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={18} />

      {empty ? (
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={18}
          strokeDasharray={`${circ} ${circ}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      ) : (
        <>
          {/* Lulus — emerald */}
          {lulus > 0 && (
            <circle
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke="#01793B"
              strokeWidth={18}
              strokeDasharray={`${lulusDash} ${circ}`}
              strokeDashoffset={lulusOffset}
              strokeLinecap="butt"
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          )}
          {/* Menunggu — amber */}
          {menunggu > 0 && (
            <circle
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke="#f59e0b"
              strokeWidth={18}
              strokeDasharray={`${menungguDash} ${circ}`}
              strokeDashoffset={menungguOffset}
              strokeLinecap="butt"
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          )}
          {/* Tidak Lulus — rose */}
          {tidakLulus > 0 && (
            <circle
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke="#f43f5e"
              strokeWidth={18}
              strokeDasharray={`${tidakLulusDash} ${circ}`}
              strokeDashoffset={tidakLulusOffset}
              strokeLinecap="butt"
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          )}
        </>
      )}

      {/* Center label */}
      <text x={cx} y={cy - 6} textAnchor="middle" className="fill-gray-900" fontSize={24} fontWeight={800}>
        {total}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="#94a3b8" fontSize={10} fontWeight={600} letterSpacing={1}>
        TOTAL
      </text>
    </svg>
  );
}

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
  const [chartData, setChartData] = useState<any[]>([]);
  const [rawPpdbData, setRawPpdbData] = useState<any[]>([]);
  
  // Date states for filtering
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const processChartData = (data: any[], start: string, end: string) => {
    const sDate = new Date(start);
    const eDate = new Date(end);
    sDate.setHours(0,0,0,0);
    eDate.setHours(23,59,59,999);

    const diffTime = Math.abs(eDate.getTime() - sDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // Limit to reasonable number of days for chart (e.g. 31 days)
    const limitDays = Math.min(diffDays, 31);
    
    const result = Array.from({ length: limitDays }, (_, i) => {
      const d = new Date(sDate);
      d.setDate(sDate.getDate() + i);
      
      const dayName = d.toLocaleDateString('id-ID', { weekday: 'short' });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString('id-ID', { month: 'short' });
      
      const count = data.filter((s: any) => {
        if (!s.user?.created_at) return false;
        const regDate = new Date(s.user?.created_at);
        return regDate.toDateString() === d.toDateString();
      }).length;
      
      return { 
        name: diffDays > 7 ? `${dayNum}/${d.getMonth()+1}` : dayName,
        fullName: `${dayName}, ${dayNum} ${monthName}`,
        total: count, 
        rawDate: d 
      };
    });
    
    setChartData(result);
  };

  useEffect(() => {
    setDashboardInfo("Ringkasan Admin", "Kelola SPMB dan informasi sekolah");
  }, [setDashboardInfo]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      const profile = await fetchProfile();
      if (!profile.success || !profile.data) { router.push("/auth/login"); return; }
      if (profile.data.role !== "admin") { router.push("/dashboard/siswa"); return; }
      const [ppdbResponse, infoResponse] = await Promise.all([
        listPpdbSiswa(),
        listInformasiSekolah(),
      ]);
      if (!ppdbResponse.success) setError(ppdbResponse.error || "Gagal memuat data SPMB");
      if (!infoResponse.success) setError(infoResponse.error || "Gagal memuat informasi");
      const ppdbList = ppdbResponse.data || [];
      setRawPpdbData(ppdbList);
      setTotalPpdb(ppdbList.length);
      setMenungguCount(ppdbList.filter((s: { status_ppdb?: string }) => s.status_ppdb === "menunggu").length);
      setLulusCount(ppdbList.filter((s: { status_ppdb?: string }) => s.status_ppdb === "lulus").length);
      setTidakLulusCount(ppdbList.filter((s: { status_ppdb?: string }) => s.status_ppdb === "tidak_lulus").length);
      
      // Default range: Monday to Saturday of current week
      const now = new Date();
      const currentDay = now.getDay();
      const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;
      const mon = new Date(now);
      mon.setDate(now.getDate() + diffToMonday);
      const sat = new Date(mon);
      sat.setDate(mon.getDate() + 5);
      
      const sStr = mon.toISOString().split('T')[0];
      const eStr = sat.toISOString().split('T')[0];
      
      setStartDate(sStr);
      setEndDate(eStr);
      processChartData(ppdbList, sStr, eStr);

      setTotalInfo((infoResponse.data || []).length);
      setLoading(false);
    };
    load();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#01793B]/20 border-t-[#01793B] rounded-full animate-spin" />
          <span className="text-sm font-medium">Memuat dashboard...</span>
        </div>
      </div>
    );
  }

  const statBars = [
    { label: "Menunggu", count: menungguCount, color: "bg-amber-400", textColor: "text-amber-600", bg: "bg-amber-50" },
    { label: "Lulus", count: lulusCount, color: "bg-emerald-500", textColor: "text-emerald-700", bg: "bg-emerald-50" },
    { label: "Tidak Lulus", count: tidakLulusCount, color: "bg-rose-400", textColor: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="space-y-6">
      {error && (
        <div className="text-sm font-bold text-red-600 bg-red-50 border border-red-100 rounded-2xl px-5 py-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shrink-0" />
          {error}
        </div>
      )}

      {/* Top stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total pendaftar */}
        <Link
          href="/dashboard/admin/ppdb"
          className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-[#01793B] group-hover:bg-emerald-100 transition-colors">
            <Users size={22} />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total Pendaftar</p>
            <p className="text-3xl font-black text-gray-900 mt-0.5">{totalPpdb}</p>
          </div>
          <ArrowRight size={16} className="text-gray-300 group-hover:text-emerald-500 transition-colors" />
        </Link>

        {/* Menunggu */}
        <Link
          href="/dashboard/admin/ppdb"
          className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover:bg-amber-100 transition-colors">
            <Clock size={22} />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Menunggu</p>
            <p className="text-3xl font-black text-gray-900 mt-0.5">{menungguCount}</p>
          </div>
          <ArrowRight size={16} className="text-gray-300 group-hover:text-amber-400 transition-colors" />
        </Link>

        {/* Informasi sekolah */}
        <Link
          href="/dashboard/admin/informasi"
          className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-100 transition-colors">
            <FileText size={22} />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Info Sekolah</p>
            <p className="text-3xl font-black text-gray-900 mt-0.5">{totalInfo}</p>
          </div>
          <ArrowRight size={16} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
        </Link>
      </div>

      {/* Trend Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3 self-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#01793B]">
              <TrendingUp size={18} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Tren Pendaftaran</h2>
              <p className="text-xs text-gray-400 mt-0.5">Filter berdasarkan rentang pendaftaran</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                if (endDate) processChartData(rawPpdbData, e.target.value, endDate);
              }}
              className="bg-transparent text-[11px] font-bold text-gray-600 outline-none px-2 py-1"
            />
            <span className="text-gray-300">—</span>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                if (startDate) processChartData(rawPpdbData, startDate, e.target.value);
              }}
              className="bg-transparent text-[11px] font-bold text-gray-600 outline-none px-2 py-1"
            />
          </div>
        </div>
        <TrendChart data={chartData} />
      </div>

      {/* Chart + Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#01793B]">
            <Users size={18} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Status Pendaftar SPMB</h2>
            <p className="text-xs text-gray-400 mt-0.5">Distribusi status seluruh calon murid</p>
          </div>
          <Link
            href="/dashboard/admin/ppdb"
            className="ml-auto text-xs font-bold text-[#01793B] hover:underline flex items-center gap-1"
          >
            Lihat semua <ArrowRight size={12} />
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-8">
          {/* Donut */}
          <DonutChart
            menunggu={menungguCount}
            lulus={lulusCount}
            tidakLulus={tidakLulusCount}
            total={totalPpdb}
          />

          {/* Legend + bar breakdown */}
          <div className="flex-1 w-full space-y-4">
            {statBars.map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                    <span className="text-sm font-medium text-gray-600">{s.label}</span>
                  </div>
                  <span className={`text-sm font-black ${s.textColor}`}>{s.count}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${s.color} transition-all duration-700`}
                    style={{ width: totalPpdb > 0 ? `${(s.count / totalPpdb) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            ))}

            {totalPpdb === 0 && (
              <p className="text-sm text-gray-400 text-center py-3">Belum ada data pendaftar</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick links row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/admin/ppdb"
          className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#01793B]">
            <CheckCircle size={18} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-sm">Data Pendaftar</p>
            <p className="text-xs text-gray-400">Verifikasi & buat keputusan</p>
          </div>
          <ArrowRight size={15} className="text-gray-300 group-hover:text-emerald-500 transition-colors" />
        </Link>
        <Link
          href="/dashboard/admin/jadwal-spmb"
          className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
            <Clock size={18} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-sm">Jadwal SPMB</p>
            <p className="text-xs text-gray-400">Atur periode pendaftaran</p>
          </div>
          <ArrowRight size={15} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
        </Link>
      </div>
    </div>
  );
}

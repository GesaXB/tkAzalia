import { SidebarItem } from "@/Components/Dashboard/DashboardShell";

export const adminMenuItems: SidebarItem[] = [
  { label: "Ringkasan", href: "/dashboard/admin" },
  { label: "Jadwal PPDB", href: "/dashboard/admin/jadwal-ppdb" },
  { label: "Kelas PPDB", href: "/dashboard/admin/kelas" },
  { label: "Jenis Berkas", href: "/dashboard/admin/jenis-berkas" },
  { label: "PPDB (Data Pendaftar)", href: "/dashboard/admin/ppdb" },
  { label: "Blog", href: "/dashboard/admin/informasi" },
  { label: "Profil", href: "/dashboard/admin/profile" },
  { label: "← Kembali ke Beranda", href: "/" },
];

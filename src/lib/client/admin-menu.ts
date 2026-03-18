import { SidebarItem } from "@/Components/Dashboard/DashboardShell";

export const adminMenuItems: SidebarItem[] = [
  { label: "Ringkasan", href: "/dashboard/admin" },
  { label: "Jadwal SPMB", href: "/dashboard/admin/jadwal-spmb" },
  { label: "Kelola Kelas", href: "/dashboard/admin/kelas" },
  { label: "Jenis Berkas", href: "/dashboard/admin/jenis-berkas" },
  { label: "Data Pendaftar SPMB", href: "/dashboard/admin/ppdb" },
  { label: "Blog", href: "/dashboard/admin/informasi" },
  { label: "Profil", href: "/dashboard/admin/profile" },
  { label: "Kembali ke Beranda", href: "/" },
];

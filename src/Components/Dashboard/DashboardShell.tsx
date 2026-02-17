"use client";

import { motion } from "framer-motion";
import { Menu, PanelLeftClose } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import LogoutModal from "./LogoutModal";

export interface SidebarItem {
  label: string;
  href: string;
}

interface DashboardShellProps {
  title: string;
  subtitle: string;
  sidebarTitle: string;
  items: SidebarItem[];
  onLogout: () => void;
  children: React.ReactNode;
}

const SIDEBAR_WIDTH = 260;

export default function DashboardShell({
  title,
  subtitle,
  sidebarTitle,
  items,
  onLogout,
  children,
}: DashboardShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [greetingMascot, setGreetingMascot] = useState("");

  useEffect(() => {
    const stored =
      typeof window !== "undefined" && localStorage.getItem("dashboard-sidebar-open");
    if (stored !== null) setSidebarOpen(stored === "true");

    // Set random friendly mascot
    const mascots = ["👋", "🌟", "🚀", "😺", "✨", "🌈", "🎈"];
    setGreetingMascot(mascots[Math.floor(Math.random() * mascots.length)]);
  }, []);

  const setSidebarOpenAndStore = (open: boolean) => {
    setSidebarOpen(open);
    if (typeof window !== "undefined")
      localStorage.setItem("dashboard-sidebar-open", String(open));
  };

  const handleLogoutClick = () => setLogoutModalOpen(true);
  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false);
    onLogout();
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      <motion.aside
        className="shrink-0 h-screen border-r border-slate-200/80 bg-white flex flex-col overflow-hidden"
        initial={false}
        animate={{ width: sidebarOpen ? SIDEBAR_WIDTH : 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 220 }}
      >
        <div className="w-[260px] min-h-full flex flex-col">
          <div className="flex items-center justify-between gap-2 px-4 pt-5 pb-4 border-b border-slate-100">
            <Link href={items[0]?.href ?? "#"} className="flex items-center gap-3 shrink-0 min-w-0">
              <div className="relative h-10 w-10 shrink-0 rounded-xl overflow-hidden bg-emerald-50 ring-1 ring-slate-200/80">
                <Image
                  src="/logotk.png"
                  alt="TK Azalia"
                  fill
                  className="object-contain p-0.5"
                  sizes="40px"
                  priority
                />
              </div>
              <span className="text-sm font-bold text-slate-800 truncate">TK Azalia</span>
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpenAndStore(false)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors shrink-0"
              aria-label="Tutup menu"
            >
              <PanelLeftClose className="h-5 w-5" />
            </button>
          </div>
          <div className="px-3 py-4 flex-1 overflow-y-auto">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-3 mb-3">
              {sidebarTitle}
            </div>
            <nav className="space-y-0.5" aria-label="Dashboard menu">
              {items.map((item) => {
                const isBase =
                  item.href === "/dashboard/admin" || item.href === "/dashboard/siswa";
                const isActive = isBase
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                      ? "bg-emerald-500/10 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                  >
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </motion.aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="shrink-0 px-4 sm:px-6 lg:px-8 py-4 border-b border-slate-200/80 bg-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpenAndStore(!sidebarOpen)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors shrink-0"
              aria-label={sidebarOpen ? "Tutup menu" : "Buka menu"}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 truncate">{title}</h1>
              <p className="text-sm text-slate-500 truncate">{subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogoutClick}
            className="shrink-0 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            Keluar
          </button>
        </header>

        <motion.main
          className="flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }} // Light custom ease
          key={pathname}
        >
          {children}
        </motion.main>
      </div>

      <LogoutModal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { ChevronDown, Menu, PanelLeftClose } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import LogoutModal from "./LogoutModal";

export interface SidebarSubItem {
  label: string;
  href: string;
}

export interface SidebarItem {
  label: string;
  href?: string;
  submenu?: SidebarSubItem[];
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
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored =
      typeof window !== "undefined" && localStorage.getItem("dashboard-sidebar-open");
    if (stored !== null) setSidebarOpen(stored === "true");
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

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  const isMenuExpanded = (label: string) => expandedMenus.has(label);
  const isSubmenuActive = (submenu: SidebarSubItem[] | undefined) => {
    if (!submenu) return false;
    return submenu.some((item) => pathname === item.href || pathname.startsWith(item.href + "/"));
  };

  const closeSidebarOnMobile = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSidebarOpenAndStore(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpenAndStore(false)}
        />
      )}
      <motion.aside
        className={`shrink-0 h-screen border-r border-slate-200/80 bg-white flex flex-col overflow-hidden z-50 ${sidebarOpen ? "fixed inset-y-0 left-0 lg:relative" : "w-0"
          }`}
        initial={false}
        animate={{ width: sidebarOpen ? SIDEBAR_WIDTH : 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 220 }}
      >
        <div className="w-[260px] min-h-full flex flex-col">
          <div className="flex items-center justify-between gap-2 px-4 pt-5 pb-4 border-b border-slate-100">
            <Link
              href={items[0]?.href ?? "#"}
              onClick={closeSidebarOnMobile}
              className="flex items-center gap-3 shrink-0 min-w-0"
            >
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
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                const isExpanded = isMenuExpanded(item.label);
                const isActive = item.href ? (
                  item.href === "/dashboard/admin" || item.href === "/dashboard/siswa"
                    ? pathname === item.href
                    : pathname === item.href || pathname.startsWith(item.href + "/")
                ) : isSubmenuActive(item.submenu);

                if (hasSubmenu) {
                  return (
                    <div key={item.label} className="space-y-0.5">
                      <button
                        onClick={() => toggleMenu(item.label)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                          ? "bg-emerald-500/10 text-emerald-700"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          }`}
                      >
                        <span className="truncate flex-1 text-left">{item.label}</span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="shrink-0"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </button>

                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-0.5 pl-3"
                        >
                          {item.submenu?.map((subitem) => {
                            const isSubitemActive =
                              pathname === subitem.href || pathname.startsWith(subitem.href + "/");
                            return (
                              <Link
                                key={subitem.href}
                                href={subitem.href}
                                prefetch
                                onClick={closeSidebarOnMobile}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isSubitemActive
                                  ? "bg-emerald-500/10 text-emerald-700 border-l-2 border-emerald-500"
                                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                  }`}
                              >
                                <span className="truncate">{subitem.label}</span>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href ?? "/"}
                    prefetch
                    onClick={closeSidebarOnMobile}
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

      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        <header className="sticky top-0 z-30 shrink-0 px-4 sm:px-6 lg:px-8 py-4 border-b border-slate-200/80 bg-white/95 backdrop-blur-md flex items-center justify-between gap-4">
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
          transition={{ duration: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
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

"use client";

import DashboardShell from "@/Components/Dashboard/DashboardShell";
import { DashboardProvider, useDashboard } from "@/context/DashboardContext";
import { adminMenuItems } from "@/lib/client/admin-menu";
import { fetchProfile } from "@/lib/client/auth";
import { clearToken } from "@/lib/client/session";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function AdminDashboardShellWrapper({ children }: { children: React.ReactNode }) {
  const { title, subtitle } = useDashboard();
  const router = useRouter();

  const handleLogout = () => {
    clearToken();
    router.push("/");
  };

  return (
    <DashboardShell
      title={title}
      subtitle={subtitle}
      sidebarTitle="Admin Menu"
      items={adminMenuItems}
      onLogout={handleLogout}
    >
      {children}
    </DashboardShell>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const profile = await fetchProfile();
      if (!profile.success || !profile.data) {
        router.push("/auth/login");
        return;
      }
      if (profile.data.role !== "admin") {
        router.push("/dashboard/siswa");
        return;
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Memuat...
      </div>
    );
  }

  return (
    <DashboardProvider>
      <AdminDashboardShellWrapper>{children}</AdminDashboardShellWrapper>
    </DashboardProvider>
  );
}

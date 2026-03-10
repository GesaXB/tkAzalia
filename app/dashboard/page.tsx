"use client";

import { fetchProfile } from "@/lib/client/auth";
import { clearToken } from "@/lib/client/session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const route = async () => {
      const profile = await fetchProfile();
      if (!profile.success || !profile.data) {
        clearToken();
        router.push("/auth/login");
        return;
      }
      if (profile.data.role === "admin") {
        router.push("/dashboard/admin");
        return;
      }
      router.push("/dashboard/siswa");
    };
    route();
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
      Mengarahkan ke dashboard...
    </div>
  );
}


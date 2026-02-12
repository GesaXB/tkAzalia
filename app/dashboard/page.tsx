"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchProfile } from "@/lib/client/auth";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const route = async () => {
      const profile = await fetchProfile();
      if (!profile.success || !profile.data) {
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


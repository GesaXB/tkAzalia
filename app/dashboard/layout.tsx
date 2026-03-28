import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen w-full">{children}</div>;
}


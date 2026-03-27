"use client";

import { createContext, ReactNode, useContext, useState, useCallback } from "react";

interface DashboardContextType {
  title: string;
  subtitle: string;
  setDashboardInfo: (title: string, subtitle: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("Dashboard");
  const [subtitle, setSubtitle] = useState("");

  const setDashboardInfo = useCallback((newTitle: string, newSubtitle: string) => {
    setTitle(newTitle);
    setSubtitle(newSubtitle);
  }, []);

  return (
    <DashboardContext.Provider value={{ title, subtitle, setDashboardInfo }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}

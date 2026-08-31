"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const noSidebarRoutes = ["/", "/login", "/register"];
  const showSidebar = !noSidebarRoutes.includes(pathname);

  return (
    <>
      {showSidebar && <Sidebar />}
      <main className={`flex-1 overflow-y-auto ${showSidebar ? "p-8" : ""}`}>
        {children}
      </main>
    </>
  );
}

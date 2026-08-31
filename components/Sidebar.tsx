"use client";

import * as React from "react";
import { NavItem } from "@/components/NavItems";
import { LogOut, Menu, X, List, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/use-auth";

export const menuItems = [
  {
    href: "/submissions/list",
    icon: <List className="w-5 h-5" />,
    label: "Daftar Pengajuan",
  },
  {
    href: "/submissions/create",
    icon: <FilePlus className="w-5 h-5" />,
    label: "Buat Pengajuan",
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(true);
  const { logout, user } = useAuth();

  return (
    <aside
      className={`h-screen bg-[var(--color-heading)] text-white flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div
        className={`p-4 border-b border-[var(--color-body)] flex items-center ${
          isOpen ? "justify-between" : "justify-center"
        }`}
      >
        {isOpen && (
          <h1 className="text-sm font-bold text-[var(--color-primary-light)] truncate">
            Credit Approval System
          </h1>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-md hover:bg-[var(--color-body)] transition-colors focus:outline-none"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-x-hidden">
        {menuItems
          .filter((item) => {
            if (user?.role === "CREDIT_ANALYST") {
              return item.href === "/submissions/list";
            }
            return true;
          })
          .map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isOpen={isOpen}
            />
          ))}
      </nav>

      <div className="p-4 border-t border-[var(--color-body)]">
        <Button
          variant="danger"
          className={`w-full flex items-center ${
            isOpen ? "justify-start px-4" : "justify-center px-0"
          }`}
          title={!isOpen ? "Logout" : undefined}
          onClick={logout}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </aside>
  );
}

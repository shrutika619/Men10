"use client";

import React from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Building2,
  Video,
  Stethoscope,
  Settings,
  ScrollText,
  Users,
  X,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const menuItems = [
  { label: "Admin Dashboard", icon: LayoutDashboard, path: "admindashboard" },
  { label: "Inquiry Direct", icon: MessageSquare, path: "inquirydirect" },
  { label: "In-clinic Consultation", icon: Building2, path: "inclinicconsultation" },
  { label: "Teleconsultation", icon: Video, path: "teleconsultation" },
  { label: "Clinic", icon: Stethoscope, path: "clinic" },
  { label: "Setup", icon: Settings, path: "setup" },
  { label: "Audit Logs", icon: ScrollText, path: "auditlogs" },
  { label: "Team", icon: Users, path: "team" },
];

const AdminSidebarPage = ({ role = "SUPER_ADMIN", isMobileOpen, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Role-based filtering
  const filteredMenu = menuItems.filter((item) => {
    if (role === "ADMIN" && item.label === "Setup") return false;
    return true;
  });

  const handleNavigation = (path) => {
    router.push(`/admin/${path}`);
    onClose?.();
  };

  const isActive = (path) => pathname === `/admin/${path}`;

  return (
    <>
      {/* 🔹 Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 🔹 Sidebar */}
      <aside
        className={`
          fixed lg:sticky
          top-0 left-0
          h-screen w-72
          bg-white border-r border-gray-200
          z-50
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          overflow-y-auto
        `}
      >
        {/* 🔹 Header */}
        <div className="flex items-center justify-between p-6">
          <h1 className="text-blue-600 font-bold text-2xl">MEN10</h1>

          {/* Close button (Mobile only) */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* 🔹 Navigation */}
        <nav className="p-4 space-y-7">
          {filteredMenu.map(({ label, icon: Icon, path }) => (
            <button
              key={label}
              onClick={() => handleNavigation(path)}
              className={`
                w-full flex items-center gap-6 px-4 py-3 rounded-lg text-left
                transition-all duration-200 font-medium
                ${
                  isActive(path)
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebarPage;

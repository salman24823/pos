"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Clock,
  DollarSign,
  User,
  LogOut,
  LogIn,
  LogOutIcon,
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/staff/dashboard", icon: <LayoutDashboard /> },
  { name: "Attendance", href: "/staff/attendance", icon: <Clock /> },
  { name: "Check In", href: "/staff/checkin", icon: <LogIn /> },
  { name: "Check Out", href: "/staff/checkout", icon: <LogOutIcon /> },
  { name: "Salary", href: "/staff/salary", icon: <DollarSign /> },
  { name: "Profile", href: "/staff/profile", icon: <User /> },
];

export default function StaffLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-purple-600">Staff Panel</div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-2 p-2 rounded-lg text-sm font-medium transition ${
                pathname === link.href
                  ? "bg-purple-100 text-purple-700"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600"
          onClick={() => {
            // Sign out
            window.location.href = "/api/auth/signout";
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

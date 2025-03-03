"use client";
import { useSidebar } from "@/Context/SidebarContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import {
  FaTachometerAlt,
  FaChartLine,
  FaWallet,
  FaExchangeAlt,
} from "react-icons/fa";

function Sidebar() {
  const { isSidebarOpen } = useSidebar();
  const pathname = usePathname(); // ✅ Get Current Route

  // ✅ Define Links
  const navLinks = [
    {
      href: "/Dashboard",
      label: "Dashboard",
      icon: <FaTachometerAlt className="text-xl" />,
    },
    {
      href: "/investment",
      label: "Investments",
      icon: <FaChartLine className="text-xl" />,
    },
    {
      href: "/earnings",
      label: "Earnings",
      icon: <FaWallet className="text-xl" />,
    },
    {
      href: "/exchange",
      label: "Exchanges",
      icon: <FaExchangeAlt className="text-xl" />,
    },
  ];

  return (
    <aside
      className={`w-64 fixed top-0 left-0 bg-black z-50 transition-all duration-500 ease-in-out h-screen text-white p-6 flex flex-col items-center shadow-lg lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Sidebar Title */}
      <h1 className="text-2xl font-bold mb-8  text-center">Dashboard</h1>

      {/* Navigation Links */}
      <nav className="space-y-4 w-full">
        {navLinks.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center space-x-3 px-4 py-3 rounded transition duration-300 ${
              pathname === href ? "bg-blue-700" : "hover:bg-gray-700"
            }`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

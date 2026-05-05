"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import {
  LayoutDashboard, Car, BarChart2, CreditCard,
  Inbox, Calendar, Settings, HelpCircle, LogOut,
} from "lucide-react";

const mainMenu = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Car,             label: "Car Rent",  href: "/cars"      },
  { icon: BarChart2,       label: "Insight",   href: "/dashboard" },
  { icon: CreditCard,      label: "Reimburse", href: "/dashboard" },
  { icon: Inbox,           label: "Inbox",     href: "/dashboard" },
  { icon: Calendar,        label: "Calendar",  href: "/dashboard" },
];

const preferences = [
  { icon: Settings,   label: "Settings",     href: "/settings" },
  { icon: HelpCircle, label: "Help & Center", href: "/settings" },
];

export default function DashboardSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <aside className="w-[260px] shrink-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col justify-between py-8 px-5 min-h-screen transition-colors">

      {/* Top */}
      <div className="flex flex-col gap-8">
        {/* Logo → home */}
        <div className="flex items-center justify-between px-1">
          <Link href="/" className="text-[#3563E9] font-bold text-2xl tracking-wide hover:opacity-80 transition-opacity">
            MORENT
          </Link>
          {onClose && (
            <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" aria-label="Close sidebar">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          )}
        </div>

        {/* Main Menu */}
        <div>
          <p className="text-xs font-semibold text-gray-300 tracking-widest uppercase px-1 mb-3">Main Menu</p>
          <ul className="flex flex-col gap-1">
            {mainMenu.map(({ icon: Icon, label, href }) => {
              const active = pathname === href && label === "Dashboard";
              return (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-[8px] text-sm font-semibold transition-colors ${
                      active
                        ? "bg-[#3563E9] text-white"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Preferences */}
        <div>
          <p className="text-xs font-semibold text-gray-300 tracking-widest uppercase px-1 mb-3">Preferences</p>
          <ul className="flex flex-col gap-1">
            {preferences.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-[8px] text-sm font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <Icon size={18} />
                  {label}
                </Link>
              </li>
            ))}

            {/* Dark Mode toggle — connected to ThemeProvider */}
            <li>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Dark Mode</span>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle dark mode"
                  className={`w-11 h-6 rounded-full transition-colors relative ${theme === "dark" ? "bg-[#3563E9]" : "bg-gray-200"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${theme === "dark" ? "left-6" : "left-1"}`} />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom — Log Out → back to home */}
      <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-[8px] text-sm font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-500 transition-colors">
        <LogOut size={18} />
        Log Out
      </Link>

    </aside>
  );
}

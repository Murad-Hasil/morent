"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { Bell, Heart, LayoutDashboard, LogOut, Menu, Moon, Search, Settings, SlidersHorizontal, Sun, User, X } from "lucide-react";
import { useFavorites, useNotifs } from "@/lib/store";

const notifications = [
  { id: 1, icon: "✅", title: "Booking Confirmed", desc: "Your Koenigsegg rental is confirmed for May 6.", time: "2m ago", read: false },
  { id: 2, icon: "🕐", title: "Pick-up Reminder", desc: "Your pick-up is scheduled for tomorrow at 10:00 AM.", time: "1h ago", read: false },
  { id: 3, icon: "🚗", title: "New Cars Available", desc: "Check out our latest SUV collection.", time: "3h ago", read: true },
  { id: 4, icon: "🎉", title: "Weekend Offer", desc: "Get 20% off on all rentals this weekend.", time: "1d ago", read: true },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const favCount = useFavorites((s) => s.favorites.length);
  const { readIds, markAllRead, isRead } = useNotifs();
  const router = useRouter();
  useEffect(() => setMounted(true), []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/cars?q=${encodeURIComponent(q)}`);
    else router.push("/cars");
    setMobileOpen(false);
  }

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-4 transition-colors duration-300">
      <div className="flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="text-[#3563E9] font-bold text-2xl tracking-wide shrink-0 hover:opacity-80 transition-opacity">
          MORENT
        </Link>

        {/* Search Bar */}
        <form role="search" onSubmit={handleSearch} className="hidden md:flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 w-full max-w-[492px] bg-white dark:bg-gray-800 transition-colors">
          <button type="submit" aria-label="Search" className="shrink-0">
            <Search className="text-gray-400 hover:text-[#3563E9] transition-colors" size={20} aria-hidden="true" />
          </button>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search something here"
            aria-label="Search cars"
            className="flex-1 outline-none text-sm text-gray-500 dark:text-gray-300 bg-transparent placeholder:text-gray-300 dark:placeholder:text-gray-500"
          />
          <SlidersHorizontal className="text-gray-400 shrink-0" size={20} aria-hidden="true" />
        </form>

        {/* Right Icons */}
        <div className="hidden md:flex items-center gap-5 shrink-0">
          <Link href="/favorites" aria-label={mounted && favCount > 0 ? `Favorites (${favCount})` : "Favorites"} className="relative text-gray-400 hover:text-[#3563E9] dark:hover:text-[#3563E9] transition-colors">
            <Heart size={24} aria-hidden="true" />
            {mounted && favCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#3563E9] text-white text-[9px] font-bold rounded-full flex items-center justify-center" aria-hidden="true">
                {favCount}
              </span>
            )}
          </Link>

          {/* Bell with dropdown */}
          <div className="relative">
            <button
              aria-label="Notifications"
              aria-expanded={notifOpen}
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative text-gray-400 hover:text-[#3563E9] transition-colors"
            >
              <Bell size={24} aria-hidden="true" />
              {notifications.some(n => !isRead(n.id)) && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
              )}
            </button>

            {notifOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
                <div className="absolute right-0 top-full mt-3 w-80 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl z-20 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <span className="font-semibold text-sm text-gray-900 dark:text-white">Notifications</span>
                    <button
                      onClick={() => markAllRead(notifications.map(n => n.id))}
                      className="text-xs text-[#3563E9] hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <ul>
                    {notifications.map((n) => {
                      const read = isRead(n.id);
                      return (
                        <li key={n.id} className={`flex gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer border-b border-gray-50 dark:border-gray-800 last:border-0 ${!read ? "bg-blue-50/50 dark:bg-blue-950/20" : ""}`}>
                          <span className="text-xl shrink-0 mt-0.5">{n.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{n.title}</p>
                            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{n.desc}</p>
                            <p className="text-[10px] text-gray-300 dark:text-gray-600 mt-1">{n.time}</p>
                          </div>
                          {!read && <span className="w-2 h-2 bg-[#3563E9] rounded-full shrink-0 mt-1.5" />}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Settings */}
          <Link href="/settings" aria-label="Settings" className="text-gray-400 hover:text-[#3563E9] transition-colors">
            <Settings size={24} aria-hidden="true" />
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              aria-label="Profile menu"
              aria-expanded={profileOpen}
              onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
              className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden shrink-0 ring-2 ring-transparent hover:ring-[#3563E9] transition-all"
            >
              <img src="https://i.pravatar.cc/40" alt="" className="w-full h-full object-cover" />
            </button>

            {profileOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 top-full mt-3 w-52 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl z-20 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Murad Hasil</p>
                    <p className="text-xs text-gray-400 truncate">mbmuradhasil@gmail.com</p>
                  </div>
                  <ul className="py-1">
                    <li>
                      <Link href="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <LayoutDashboard size={16} className="text-gray-400" /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link href="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Settings size={16} className="text-gray-400" /> Settings
                      </Link>
                    </li>
                    <li>
                      <Link href="/favorites" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Heart size={16} className="text-gray-400" /> Favorites
                      </Link>
                    </li>
                  </ul>
                  <div className="border-t border-gray-100 dark:border-gray-800 py-1">
                    <Link href="/" onClick={() => setProfileOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                      <LogOut size={16} /> Log Out
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Hamburger */}
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="md:hidden text-gray-500 hover:text-[#3563E9] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden mt-4 flex flex-col gap-4">
          <form onSubmit={handleSearch} className="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 bg-white dark:bg-gray-800">
            <button type="submit" aria-label="Search" className="shrink-0">
              <Search className="text-gray-400 hover:text-[#3563E9] transition-colors" size={18} aria-hidden="true" />
            </button>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search something here"
              aria-label="Search cars"
              className="flex-1 outline-none text-sm text-gray-500 dark:text-gray-300 bg-transparent"
            />
          </form>
          <div className="flex items-center justify-around py-2">
            <Link href="/favorites" aria-label="Favorites" className="text-gray-400 hover:text-[#3563E9] transition-colors"><Heart size={22} aria-hidden="true" /></Link>
            <button
              aria-label="Notifications"
              onClick={() => { setMobileOpen(false); setNotifOpen(true); }}
              className="relative text-gray-400 hover:text-[#3563E9] transition-colors"
            >
              <Bell size={22} aria-hidden="true" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true" />
            </button>
            <Link href="/settings" aria-label="Settings" className="text-gray-400 hover:text-[#3563E9] transition-colors" onClick={() => setMobileOpen(false)}>
              <Settings size={22} aria-hidden="true" />
            </Link>
            <button
              aria-label="Toggle dark mode"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-yellow-400"
            >
              {theme === "dark" ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
            </button>
            <button aria-label="View profile" className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden">
              <img src="https://i.pravatar.cc/40" alt="" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

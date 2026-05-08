"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun, Check } from "lucide-react";

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${enabled ? "bg-[#3563E9]" : "bg-gray-200 dark:bg-gray-700"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${enabled ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <h2 className="px-6 py-4 text-sm font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 uppercase tracking-wide">
        {title}
      </h2>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">{children}</div>
    </div>
  );
}

function Row({ label, desc, right }: { label: string; desc?: string; right: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 gap-4">
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
        {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
      </div>
      {right}
    </div>
  );
}

const STORAGE_KEY = "morent-settings";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("English");
  const [notifs, setNotifs] = useState({ bookings: true, offers: true, reminders: true, newsletter: false });
  const [saved, setSaved] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState("Murad Hasil");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.language) setLanguage(parsed.language);
        if (parsed.notifs)   setNotifs(parsed.notifs);
        if (parsed.profileName) setProfileName(parsed.profileName);
      }
    } catch {}
  }, []);

  // Save to localStorage whenever values change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ language, notifs, profileName }));
    } catch {}
  }, [language, notifs, profileName]);

  function handleSaveProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    if (name) setProfileName(name);
    setEditingProfile(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <main className="w-full px-6 py-8 max-w-2xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h1>
        {saved && (
          <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
            <Check size={16} /> Saved
          </span>
        )}
      </div>

      {/* Profile */}
      <Section title="Profile">
        {editingProfile ? (
          <form onSubmit={handleSaveProfile} className="px-6 py-5 flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              name="name"
              defaultValue={profileName}
              className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-[#3563E9]"
            />
            <div className="flex gap-3">
              <button type="submit" className="text-sm bg-[#3563E9] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#2a52c9] transition-colors">Save</button>
              <button type="button" onClick={() => setEditingProfile(false)} className="text-sm text-gray-500 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</button>
            </div>
          </form>
        ) : (
          <div className="flex items-center gap-4 px-6 py-5">
            <Image src="https://i.pravatar.cc/80" alt="Profile" width={64} height={64} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{profileName}</p>
              <p className="text-sm text-gray-400">mbmuradhasil@gmail.com</p>
            </div>
            <button onClick={() => setEditingProfile(true)} className="ml-auto text-sm text-[#3563E9] hover:underline font-medium">Edit</button>
          </div>
        )}
      </Section>

      {/* Appearance */}
      <Section title="Appearance">
        <Row
          label="Dark Mode"
          desc="Switch between light and dark theme"
          right={
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          }
        />
        <Row
          label="Language"
          desc="Select your preferred language"
          right={
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none focus:border-[#3563E9]"
            >
              <option>English</option>
              <option>Urdu</option>
              <option>Arabic</option>
              <option>French</option>
            </select>
          }
        />
      </Section>

      {/* Notifications */}
      <Section title="Notifications">
        <Row label="Booking Updates" desc="Confirmations, cancellations, and changes"
          right={<Toggle enabled={notifs.bookings} onToggle={() => setNotifs(p => ({ ...p, bookings: !p.bookings }))} />} />
        <Row label="Special Offers" desc="Discounts and promotional deals"
          right={<Toggle enabled={notifs.offers} onToggle={() => setNotifs(p => ({ ...p, offers: !p.offers }))} />} />
        <Row label="Pick-up Reminders" desc="Get reminded before your rental starts"
          right={<Toggle enabled={notifs.reminders} onToggle={() => setNotifs(p => ({ ...p, reminders: !p.reminders }))} />} />
        <Row label="Newsletter" desc="Monthly updates and new car arrivals"
          right={<Toggle enabled={notifs.newsletter} onToggle={() => setNotifs(p => ({ ...p, newsletter: !p.newsletter }))} />} />
      </Section>

      {/* Account */}
      <Section title="Account">
        <Row label="Privacy Policy" right={<span className="text-gray-300 dark:text-gray-600 text-lg">›</span>} />
        <Row label="Terms of Service" right={<span className="text-gray-300 dark:text-gray-600 text-lg">›</span>} />
        <Row
          label="Delete Account"
          desc="Permanently remove your account and data"
          right={<button className="text-sm text-red-500 hover:underline font-medium">Delete</button>}
        />
      </Section>
    </main>
  );
}

import Image from "next/image";
import { ChevronDown } from "lucide-react";

function DropdownField({ value }: { value: string }) {
  return (
    <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-[6px] px-3 py-2 bg-white dark:bg-gray-800 cursor-pointer min-w-[100px]">
      <span className="text-xs text-gray-700 dark:text-gray-300 truncate">{value}</span>
      <ChevronDown size={12} className="text-gray-400 ml-2 shrink-0" />
    </div>
  );
}

export default function DetailsRental() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-[10px] overflow-hidden flex flex-col border border-transparent dark:border-gray-800">
      <h2 className="font-bold text-gray-900 dark:text-white text-base p-5 pb-0">Details Rental</h2>

      {/* Map */}
      <div className="relative mt-4 mx-4 rounded-[10px] overflow-hidden" style={{ width: "calc(100% - 2rem)" }}>
        <svg width="100%" height="100%" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="200" className="fill-[#E8F0F7] dark:fill-gray-800" />
          <rect x="0" y="80" width="400" height="18" className="fill-[#CBD8E8] dark:fill-gray-700" />
          <rect x="0" y="130" width="400" height="12" className="fill-[#CBD8E8] dark:fill-gray-700" />
          <rect x="80" y="0" width="14" height="200" className="fill-[#CBD8E8] dark:fill-gray-700" />
          <rect x="180" y="0" width="10" height="200" className="fill-[#CBD8E8] dark:fill-gray-700" />
          <rect x="280" y="0" width="14" height="200" className="fill-[#CBD8E8] dark:fill-gray-700" />
          <rect x="20"  y="20"  width="50" height="50" rx="4" className="fill-[#C4D4E8] dark:fill-gray-600" />
          <rect x="100" y="20"  width="70" height="50" rx="4" className="fill-[#C4D4E8] dark:fill-gray-600" />
          <rect x="200" y="20"  width="70" height="50" rx="4" className="fill-[#C4D4E8] dark:fill-gray-600" />
          <rect x="300" y="20"  width="80" height="50" rx="4" className="fill-[#C4D4E8] dark:fill-gray-600" />
          <rect x="20"  y="108" width="50" height="35" rx="4" className="fill-[#C4D4E8] dark:fill-gray-600" />
          <rect x="100" y="108" width="70" height="35" rx="4" className="fill-[#C4D4E8] dark:fill-gray-600" />
          <rect x="200" y="108" width="70" height="35" rx="4" className="fill-[#C4D4E8] dark:fill-gray-600" />
          <rect x="300" y="108" width="80" height="35" rx="4" className="fill-[#C4D4E8] dark:fill-gray-600" />
          <rect x="20"  y="155" width="50" height="35" rx="4" className="fill-[#C4D4E8] dark:fill-gray-600" />
          <rect x="100" y="155" width="70" height="35" rx="4" className="fill-[#C4D4E8] dark:fill-gray-600" />
          <rect x="200" y="155" width="70" height="35" rx="4" className="fill-[#C4D4E8] dark:fill-gray-600" />
          <polyline points="120,170 120,89 260,89 260,40" stroke="#3563E9" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="260" cy="36" r="8" fill="#3563E9" />
          <circle cx="260" cy="36" r="4" fill="white" />
        </svg>
      </div>

      {/* Car Info */}
      <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <div className="relative w-[80px] h-[52px] rounded-[8px] overflow-hidden bg-gradient-to-br from-[#1C3FA8] to-[#3563E9] shrink-0">
          <Image src="/cars/nissan-gtr-1.png" alt="Nissan GT-R" fill sizes="80px" className="object-contain p-1.5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 dark:text-white text-sm truncate">Nissan GT – R</p>
          <p className="text-xs text-gray-400">Sport Car</p>
        </div>
        <span className="text-xs text-gray-400 shrink-0">#9761</span>
      </div>

      {/* Pick-Up & Drop-Off */}
      <div className="px-5 py-4 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-[3px] border-[#3563E9] bg-[#3563E9]" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Pick – Up</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div><p className="text-gray-400 mb-1.5 font-medium">Locations</p><DropdownField value="Kota Semarang" /></div>
            <div><p className="text-gray-400 mb-1.5 font-medium">Date</p><DropdownField value="20 July 2022" /></div>
            <div><p className="text-gray-400 mb-1.5 font-medium">Time</p><DropdownField value="07:00" /></div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-[3px] border-[#54A6D4] bg-[#54A6D4]" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Drop – Off</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div><p className="text-gray-400 mb-1.5 font-medium">Locations</p><DropdownField value="Kota Semarang" /></div>
            <div><p className="text-gray-400 mb-1.5 font-medium">Date</p><DropdownField value="21 July 2022" /></div>
            <div><p className="text-gray-400 mb-1.5 font-medium">Time</p><DropdownField value="01:00" /></div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">Total Rental Price</p>
            <p className="text-xs text-gray-400">Overall price and includes rental discount</p>
          </div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">$80.00</span>
        </div>
      </div>
    </div>
  );
}

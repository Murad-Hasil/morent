import Image from "next/image";
import Link from "next/link";

const transactions = [
  { name: "Nissan GT – R",  type: "Sport Car", date: "20 July", price: "$80.00", image: "/cars/nissan-gtr-1.png"  },
  { name: "Koenigsegg",     type: "Sport Car", date: "19 July", price: "$99.00", image: "/cars/koenigsegg.png"    },
  { name: "Rolls – Royce",  type: "Sport Car", date: "18 July", price: "$96.00", image: "/cars/rolls-royce.png"   },
  { name: "CR – V",         type: "SUV",       date: "17 July", price: "$80.00", image: "/cars/cr-v-1.png"        },
];

export default function RecentTransactions() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-[10px] p-5 flex flex-col gap-4 border border-transparent dark:border-gray-800">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900 dark:text-white text-base">Recent Transaction</h2>
        <Link href="/cars" className="text-[#3563E9] text-sm font-semibold hover:underline">View All</Link>
      </div>

      <ul className="flex flex-col gap-3">
        {transactions.map((t) => (
          <li key={t.name + t.date} className="flex items-center gap-4">
            <div className="relative w-[80px] h-[44px] rounded-[6px] overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
              <Image src={t.image} alt={t.name} fill sizes="80px" className="object-contain p-1" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{t.name}</p>
              <p className="text-xs text-gray-400">{t.type}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-gray-400">{t.date}</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{t.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

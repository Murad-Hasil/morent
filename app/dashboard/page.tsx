import DetailsRental from "@/components/DetailsRental";
import Top5Chart from "@/components/Top5Chart";
import RecentTransactions from "@/components/RecentTransactions";

export default function DashboardPage() {
  return (
    <div className="flex gap-6 items-start">

      {/* Left — Details Rental */}
      <div className="w-[380px] shrink-0">
        <DetailsRental />
      </div>

      {/* Right — Chart + Transactions */}
      <div className="flex-1 flex flex-col gap-6">
        <Top5Chart />
        <RecentTransactions />
      </div>

    </div>
  );
}

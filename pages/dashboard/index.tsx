import SidebarNav from "@/component/dashboard/SideBar";
import { navLinks } from "@/constants";
import DashboardHeader from "@/component/dashboard/TopHeader";
import RevenueChart from "@/component/dashboard/RevenueChart";
import CustomerStats from "@/component/dashboard/CustomerStats";
import AnalyticsCards from "@/component/dashboard/AnalyticsCards";
import StatsOverview from "@/component/dashboard/StatsOverview";

export default function Dashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SidebarNav navLinks={navLinks} />

      <main className="flex-1 p-6">
        <DashboardHeader />
        <AnalyticsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueChart />
          <CustomerStats />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Here you can later add TopProducts */}
          <StatsOverview />
        </div>
      </main>
    </div>
  );
}

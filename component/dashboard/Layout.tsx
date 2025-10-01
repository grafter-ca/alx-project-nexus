"use client";
import { ReactNode } from "react";
import SidebarNav from "@/component/dashboard/SideBar";
import { navLinks } from "@/constants";
import TopHeader from "@/component/dashboard/TopHeader";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: ReactNode }) {
    const router = useRouter();
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-white shadow-lg">
        <SidebarNav navLinks={navLinks} />
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        <TopHeader />
        <Button variant="contained" color="primary" className="mb-4 md:hidden  animate-bounce cursor-pointer" onClick={() => router.push('/dashboard')}>
          Back to Dashboard
        </Button>
        {children}
      </main>
    </div>
  );
}

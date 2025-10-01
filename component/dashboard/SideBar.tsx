"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/userSlice";
import Link from "next/link";
import { navLinkProps } from "@/constants";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { LogOut } from "lucide-react";

function SidebarNav({ navLinks }: { navLinks: navLinkProps[] }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    dispatch(logout());
    router.push("/");
    window.location.reload();
  };

  return (
    <div>
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden p-2 focus:outline-none fixed top-4 right-4 z-50 text-white bg-green-600 hover:bg-green-700 hover:rotate-12 transition duration-500 ease-in-out shadow rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HiMenu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex md:flex-col`}
      >
        <nav className="flex flex-col p-5 h-full">
          {/* Logo / Brand */}
         <Link href={'/dashboard'}>
          <div
            aria-label="Logo"
            className="flex space-x-3 items-center mb-8"
            role="button"
            onClick={() => router.push("/dashboard")}
          >
            <h1 className="bg-green-600 text-white text-3xl flex items-center justify-center font-medium w-10 h-10 rounded-[10px]">
              S
            </h1>
            <h2 className="text-black sm:text-xl font-bold">
              ShopCatalog
            </h2>
          </div>
          </Link>

          {/* Nav Links */}
          <div className="flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="flex mb-6 items-center gap-3 p-3 rounded hover:bg-green-100 transition-colors"
              >
                <link.icon size={32} className="text-green-800 font-bold hover:text-green-900"/>
                <span className="font-semibold hover:text-green-700 text-gray-600 text-[25px]">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-3 p-3 rounded bg-green-400 text-white hover:text-red-600 hover:bg-green-600 w-full"
            >
              <LogOut />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default SidebarNav;

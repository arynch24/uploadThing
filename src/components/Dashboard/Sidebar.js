"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderOpen, KeyRound, Wallet, Cog } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", path: "/dashboard/overview", icon: <Home size={16} strokeWidth={0} fill="currentColor" /> },
    { name: "Files", path: "/dashboard/files", icon: <FolderOpen size={16} strokeWidth={0} fill="currentColor" /> },
    { name: "API Keys", path: "/dashboard/apikeys", icon: <KeyRound size={16} strokeWidth={0} fill="currentColor" /> },
    { name: "Plans & Billing", path: "/dashboard/billing", icon: <Wallet size={16} strokeWidth={0} fill="currentColor" /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Cog size={16} /> },
  ];

  return (
    <div className="flex w-screen shrink-0 flex-col sm:w-54 bg-black h-screen  text-white">
      <nav className="flex flex-row justify-between gap-x-4 gap-y-2 p-4 text-center text-sm sm:flex-col sm:p-6 sm:text-left ">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`flex items-center  gap-2 text-zinc-200 text-sm hover:bg-zinc-800/70  hover:text-zinc-300 h-9 px-4 py-2 rounded-md ${pathname === item.path ? "bg-zinc-800/70" : ""
              }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

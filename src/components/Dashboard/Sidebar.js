"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, User, File, CreditCard } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Apps", path: "/dashboard/apps", icon: <File size={20} /> },
    { name: "Audit Logs", path: "/dashboard/audit", icon: <Home size={20} /> },
    { name: "Billing", path: "/dashboard/billing", icon: <CreditCard size={20} /> },
    { name: "Account", path: "/dashboard/account", icon: <User size={20} /> },
    { name: "Team Settings", path: "/dashboard/team", icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 bg-black h-screen p-4 text-white">
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`flex items-center gap-2 p-2 rounded-md ${pathname === item.path ? "bg-gray-800" : "hover:bg-gray-700"
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

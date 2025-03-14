"use client";

import { Moon, Sun, HelpCircle } from "lucide-react";
import { useState } from "react";
import Profile from "./Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [darkMode, setDarkMode] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="w-full h-24 px-8 py-8 border-zinc-900 border-b-1 flex justify-between items-center">
      <div className="flex gap-6 justify-center items-center">
        <div className="text-3xl font-bold flex items-center justify-center hover:cursor-pointer" onClick={() => router.push("/")}>
            <p className="text-white ">upload</p>
            <p className="text-[#E91616]">thing</p>
        </div>
        <span className="text-5xl font-thin text-zinc-300">/</span>
        <span className=" text-white font-semibold"> {session.user.name}</span>
      </div>
      <div className="flex items-center gap-6 ">
        <a href="#" className="flex items-center justify-center gap-1 text-zinc-400 text-sm hover:bg-zinc-800/70  hover:text-zinc-300 h-9 px-4 py-2 rounded-md ">
          <HelpCircle size={20} /> Docs
        </a>
        <div className="flex gap-5">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Profile />

        </div>
      </div>
    </header>
  );
};

export default Header;

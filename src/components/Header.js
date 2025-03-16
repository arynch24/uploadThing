"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header>
      <div className="h-2 bg-[#E91616]"></div>
      <div className="w-full h-24 px-[104px] py-8 flex justify-between items-center">
        <div className="text-3xl font-bold flex items-center justify-center hover:cursor-pointer" onClick={()=>router.push("/")}>
          <p className="text-white">upload</p>
          <p className="text-[#E91616]">thing</p>
          <p className="flex items-center justify-center border-1 border-gray-400 px-0.5 py-1 rounded h-4 w-9 text-gray-400 lg:relative lg:top-1 lg:left-1 text-[9px]">
            BETA
          </p>
        </div>

        {session ? (
          <Button
            variant="default"
            onClick={() => {
              signOut();
              router.push("/");
            }}
          >
            Sign Out
          </Button>
        ) : (
          <Button variant="default" onClick={() => router.push("/signin")}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
}

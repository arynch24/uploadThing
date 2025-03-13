"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin"); // Redirect to sign-in if not logged in
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <nav className="flex justify-between p-4 bg-gray-800 text-white">
        <span>Welcome, {session?.user?.name}!</span>
        <button onClick={() => signOut({ callbackUrl: "/" })} className="px-3 py-1 bg-red-500 rounded">
          Sign Out
        </button>
      </nav>
      {children}
    </div>
  );
}

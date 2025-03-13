"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push("/signin");
    return null;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Welcome, {session.user.name}</h1>
      <p className="mt-4">This is your dashboard.</p>
    </div>
  );
}

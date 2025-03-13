"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  return (
    <div className="flex flex-col items-center bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Sign in to UploadThing</h2>
      <Button onClick={() => signIn("github", { callbackUrl })}>
        Authenticate with GitHub
      </Button>
    </div>
  );
}

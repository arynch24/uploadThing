"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <main className="relative flex flex-col lg:flex-row items-center justify-between w-full lg:px-[104px] pb-30">
      {/* Left Section */}
      <div className="max-w-xl w-1/2 text-center lg:text-left flex flex-col gap-6 lg:pr-8">
        <h1 className="text-5xl lg:text-6xl font-bold tracking-tight  ">
          <span>Better file uploads </span>
          <span className="text-[#E91616]">for developers</span>
        </h1>
        <p className="text-lg text-gray-300 ">
          Developers deserve better than S3. That&apos;s why we made UploadThing, the easier (and safer) alternative. From the button to the server, we&apos;ve got you covered.
        </p>
        <div className="flex justify-center lg:justify-start gap-4">
          <Button onClick={() => {
            if (status === "unauthenticated") {
              router.push("/signin");
            }
            else {
              router.push("/dashboard/files");
            }
          }}>Get Started for Free</Button>
          <a href="https://docs.uploadthing.com/">
            <Button variant="outline">
              Documentation →
            </Button>
          </a>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="lg:h-[700px] lg:w-[700px] relative lg:left-20 lg:top-3 ">
        <Image
          alt="File upload"
          src="https://s40vlb3kca.ufs.sh/f/b8806777-20e8-4cb2-8769-2a09a3a43e62-1tchgi.png"
          width={672}
          height={700}
          priority
          className="  rounded-lg shadow-lg"
        />
      </div>
    </main>
  );
}

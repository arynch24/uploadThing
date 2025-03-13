"use client";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

export default function SignInPage() {
  return (
    <div className="flex flex-col min-h-screen w-full gap-4 items-center justify-center bg-gradient-to-t from-white to-[#f8e6e0] text-black">
      <div className="w-1/3 flex flex-col gap-2 min-w-md items-start justify-between bg-white rounded-3xl px-8 py-12 shadow-2xl">
        {/* Logo */}
        <div className="text-3xl font-bold flex items-center">
          <p className="text-black">upload</p>
          <p className="text-[#E91616]">thing</p>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold pt-5 ">Sign in</h2>
        <p className="text-gray-500 pb-5">
          to continue to <span className="font-bold">uploadthing</span>
        </p>

        {/* Custom Sign In Button */}
        <button
          className="w-full flex items-center justify-center text-black gap-4 border border-gray-200 rounded hover:bg-gray-300/50 disabled:opacity-60 bg-white font-normal px-3 py-2"
          onClick={() => signIn("github",{callbackUrl: "/dashboard"})}
        >
          <FaGithub className="w-6 h-6" />
          Sign In with GitHub
        </button>

        {/* Terms and Conditions */}
      </div>
        <p className="text-gray-500 text-center text-md">
          By signing in, you agree to our <a href="#" className="text-blue-500 underline">Terms of Service</a>
        </p>
    </div>
  );
}

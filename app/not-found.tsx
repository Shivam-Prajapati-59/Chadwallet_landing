"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#050816] flex flex-col items-center justify-center text-white relative overflow-hidden font-sans">
      <div className="z-10 flex flex-col items-center space-y-6 text-center px-4">
        <div className="p-4  rounded-full border backdrop-blur-md">
          <AlertCircle className="w-16 h-16 " />
        </div>
        <h1 className="text-7xl font-bold tracking-tighter">404</h1>
        <h2 className="text-2xl font-semibold text-white/90">Page Not Found</h2>
        <p className="text-white/50 max-w-md text-sm md:text-base">
          The token, route, or page you are looking for has been moved, deleted,
          or never existed in the first place.
        </p>
        <Link href="/" className="mt-4">
          <Button className="text-black px-8 py-6 rounded-xl font-bold text-lg transition-transform hover:scale-105 active:scale-95 border-none">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

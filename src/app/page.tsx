
'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/panels');
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-900 text-white p-4">
      <div className="text-center space-y-6 z-10">
        <GraduationCap className="mx-auto h-20 w-20 text-blue-400" />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          CAMPUS FINDER
        </h1>
        <p className="text-xl md:text-2xl text-gray-300">
          Choose your right institution with Campus Finder
        </p>
        <Button
          size="lg"
          className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold"
          onClick={handleEnter}
        >
          Enter
        </Button>
      </div>
    </div>
  );
}

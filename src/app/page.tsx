"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if preloader was shown in this session
    const preloaderShown = sessionStorage.getItem('preloaderShown');
    
    if (!preloaderShown) {
      // First visit in this session - show preloader
      router.replace('/loading');
    } else {
      // Already shown preloader in this session - go to main
      router.replace('/main');
    }
  }, [router]);

  // Show loading while checking
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-foreground">Loading...</p>
      </div>
    </div>
  );
}

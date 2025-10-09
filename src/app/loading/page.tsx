"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Check if main page is ready
    const checkMainPage = () => {
      // Preload the main page
      fetch('/main')
        .then(() => {
          // Wait a bit more for content to be ready
          setTimeout(() => {
            setIsReady(true);
            // Mark that preloader was shown in this session
            sessionStorage.setItem('preloaderShown', 'true');
            // Redirect to main page after a short delay
            setTimeout(() => {
              router.push('/main');
            }, 500);
          }, 1000);
        })
        .catch(() => {
          // If fetch fails, still redirect after delay
          setTimeout(() => {
            setIsReady(true);
            // Mark that preloader was shown in this session
            sessionStorage.setItem('preloaderShown', 'true');
            setTimeout(() => {
              router.push('/main');
            }, 500);
          }, 2000);
        });
    };

    // Start checking after some progress
    setTimeout(checkMainPage, 1500);

    return () => {
      clearInterval(progressInterval);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-surface/20 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-primary/10 to-highlight/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-highlight/10 to-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative flex flex-col items-center space-y-8">
        {/* Logo/Brand */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {/* Main Logo Container */}
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-highlight rounded-2xl flex items-center justify-center shadow-2xl animate-pulse overflow-hidden">
              <Image
                src="/images/craiyon_162456_image.png"
                alt="RCG Logo"
                width={70}
                height={70}
                className="object-contain"
                priority
                quality={90}
              />
            </div>
            {/* Rotating Ring */}
            <div className="absolute -inset-2 border-2 border-primary/30 rounded-2xl animate-spin"></div>
            <div className="absolute -inset-4 border border-highlight/20 rounded-3xl animate-spin-reverse"></div>
          </div>
          
          {/* Company Name */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Rkhami Consulting Group</h1>
            <p className="text-lg text-foreground/60 font-medium">Business Consulting Services</p>
          </div>
        </div>

        {/* Professional Loading Animation */}
        <div className="flex flex-col items-center space-y-6">
          {/* Progress Bar */}
          <div className="w-80 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-highlight rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          
          {/* Progress Percentage */}
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {Math.round(Math.min(progress, 100))}%
            </p>
            <p className="text-foreground/70 text-sm font-medium mt-1">
              {isReady ? 'Ready!' : 'Loading your experience...'}
            </p>
          </div>
          
          {/* Loading Dots */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-highlight rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

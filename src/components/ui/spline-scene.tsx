"use client";

import { useEffect, useRef, useState } from "react";

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let app: { load: (url: string) => Promise<void>; dispose?: () => void } | null =
      null;

    const load = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const runtime = await import("@splinetool/runtime");
      if (cancelled) return;

      const Application = runtime.Application as unknown as new (
        canvasEl: HTMLCanvasElement
      ) => { load: (url: string) => Promise<void>; dispose?: () => void };

      app = new Application(canvas);
      await app.load(scene);
      if (!cancelled) setIsLoaded(true);
    };

    load();

    return () => {
      cancelled = true;
      app?.dispose?.();
    };
  }, [scene]);

  return (
    <div className={`relative ${className ?? ""}`}>
      <canvas className="w-full h-full" ref={canvasRef} />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}


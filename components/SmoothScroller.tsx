'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

interface Props {
  children: ReactNode;
}

const SmoothScroller = ({ children }: Props) => {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      smoothTouch: false
    });

    let frameId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroller;

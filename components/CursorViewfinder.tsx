'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CursorViewfinder = () => {
  const reticleRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isPointerFine || prefersReducedMotion) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (!reticleRef.current || !spotlightRef.current) return;

    const xQuick = gsap.quickTo(reticleRef.current, 'left', { duration: 0.35, ease: 'power3.out' });
    const yQuick = gsap.quickTo(reticleRef.current, 'top', { duration: 0.35, ease: 'power3.out' });
    const opacityQuick = gsap.quickTo(reticleRef.current, 'opacity', { duration: 0.25, ease: 'power2.out' });

    const move = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      xQuick(clientX);
      yQuick(clientY);
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--spotlight-x', `${clientX}px`);
        spotlightRef.current.style.setProperty('--spotlight-y', `${clientY}px`);
      }
    };

    const enter = () => opacityQuick(1);
    const leave = () => opacityQuick(0);

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseenter', enter);
    document.addEventListener('mouseleave', leave);

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseenter', enter);
      document.removeEventListener('mouseleave', leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={reticleRef}
        className="reticle"
        style={{ left: '-999px', top: '-999px', opacity: 0 }}
        aria-hidden
      />
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-[40] mix-blend-soft-light"
        style={{
          background:
            'radial-gradient(220px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(255,255,255,0.25), rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.75) 100%)',
          transition: 'opacity 0.3s ease'
        }}
        aria-hidden
      />
    </>
  );
};

export default CursorViewfinder;

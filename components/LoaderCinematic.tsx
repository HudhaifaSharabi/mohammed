'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLang } from '@/lib/i18n';

const LOADER_KEY = 'pc-loader-complete';

const assetsToPreload = [
  '/images/hero.svg',
  '/images/categories/portrait.svg',
  '/images/categories/fashion.svg',
  '/images/categories/wedding.svg',
  '/images/categories/street.svg',
  '/images/categories/product.svg'
];

const LoaderCinematic = () => {
  const { lang } = useLang();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const apertureRef = useRef<SVGSVGElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = window.localStorage.getItem(LOADER_KEY);
    if (seen) {
      setIsActive(false);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !isActive) return;

    const prefersReducedMotion = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

    const ctx = gsap.context(() => {
      if (apertureRef.current && !prefersReducedMotion) {
        gsap.to(apertureRef.current, {
          rotate: 360,
          repeat: -1,
          ease: 'linear',
          duration: 3
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isActive, isMounted]);

  useEffect(() => {
    if (!isMounted || !isActive) return;

    let loaded = 0;
    const increment = () => {
      loaded += 1;
      const value = Math.round((loaded / assetsToPreload.length) * 100);
      setProgress(value);
    };

    assetsToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = increment;
      img.onerror = increment;
    });
  }, [isActive, isMounted]);

  useEffect(() => {
    if (!isActive || progress < 100) return;
    if (!containerRef.current) return;

    const prefersReducedMotion = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.to(containerRef.current, { css: { '--flash-opacity': 1 }, duration: 0.12 })
      .to(containerRef.current, { css: { '--flash-opacity': 0 }, duration: 0.12 })
      .to(containerRef.current, {
        clipPath: 'circle(150% at 50% 50%)',
        duration: prefersReducedMotion ? 0.35 : 0.6,
        ease: 'power4.inOut'
      })
      .to(containerRef.current, { autoAlpha: 0, duration: 0.3, onComplete: () => finish() });

    return () => {
      tl.kill();
    };
  }, [progress, isActive]);

  const finish = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LOADER_KEY, 'true');
    }
    setIsActive(false);
  };

  const skip = () => {
    finish();
  };

  if (!isMounted || !isActive) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden={!isActive}
      aria-busy={isActive}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black text-text"
      style={{
        clipPath: 'circle(150% at 50% 50%)',
        background: 'radial-gradient(circle at center, rgba(0,0,0,0.5) 0%, #000 60%)',
        '--flash-opacity': 0 as number
      }}
    >
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.85)' }} />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 187, 255, 0.06), rgba(0,0,0,0.9))',
          mixBlendMode: 'screen',
          animation: 'breath 1.2s ease-in-out infinite'
        }}
      />
      <div className="relative flex flex-col items-center gap-6 text-center">
        <svg
          ref={apertureRef}
          width="160"
          height="160"
          viewBox="0 0 160 160"
          className="text-accent"
        >
          <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
            {[...Array(6)].map((_, index) => {
              const angle = (index / 6) * Math.PI * 2;
              const radius = 60;
              const x1 = 80 + Math.cos(angle) * 12;
              const y1 = 80 + Math.sin(angle) * 12;
              const x2 = 80 + Math.cos(angle + Math.PI / 3) * radius;
              const y2 = 80 + Math.sin(angle + Math.PI / 3) * radius;
              return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} opacity={0.9} />;
            })}
          </g>
          <circle cx="80" cy="80" r="18" fill="currentColor" opacity={0.2} />
        </svg>
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">
            {lang === 'ar' ? 'جارٍ التحضير' : 'Loading Vision'}
          </p>
          <p className="text-4xl font-semibold text-text">{progress}%</p>
        </div>
        <button
          type="button"
          onClick={skip}
          className="text-xs uppercase tracking-[0.2em] text-muted underline decoration-dotted underline-offset-4"
        >
          {lang === 'ar' ? 'تخطي' : 'Skip'}
        </button>
      </div>
      <style jsx>{`
        @keyframes breath {
          0%, 100% {
            opacity: 0.35;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default LoaderCinematic;

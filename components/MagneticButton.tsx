'use client';

import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode, useEffect, useRef } from 'react';
import clsx from 'classnames';
import gsap from 'gsap';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: ReactNode;
  glow?: boolean;
  href?: string;
}

const MagneticButton = ({ className, label, glow = false, href, children, ...props }: MagneticButtonProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !wrapperRef.current) return;
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFine = window.matchMedia('(pointer: fine)').matches;
    if (!isFine) return;

    const el = wrapperRef.current;
    const hover = (event: MouseEvent) => {
      if (prefersReducedMotion.current) return;
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.4,
        ease: 'power3.out'
      });
    };

    const reset = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' });
    };

    el.addEventListener('mousemove', hover);
    el.addEventListener('mouseleave', reset);

    return () => {
      el.removeEventListener('mousemove', hover);
      el.removeEventListener('mouseleave', reset);
    };
  }, []);

  const content = (
    <span className="relative z-10 flex items-center gap-2">
      {label || children}
      <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
    </span>
  );

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-accent/40 px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-text transition-colors duration-300 focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-bg',
        glow && 'shadow-glow',
        className
      )}
    >
      <span className="pointer-events-none absolute inset-0 bg-accent/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {href ? (
        <Link href={href} className="relative z-10 inline-flex items-center justify-center gap-2" role="button">
          {content}
        </Link>
      ) : (
        <button className="relative z-10 inline-flex items-center justify-center gap-2" {...props}>
          {content}
        </button>
      )}
    </div>
  );
};

export default MagneticButton;

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import MagneticButton from './MagneticButton';
import { dict, useLang } from '@/lib/i18n';
import { gsap, registerGsap } from '@/lib/gsap';

const Hero = () => {
  const { lang } = useLang();
  const copy = dict[lang].hero;
  const heroRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  const headlineWords = useMemo(() => copy.title.split(' '), [copy.title]);

  useEffect(() => {
    if (!heroRef.current) return;
    registerGsap();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        const words = gsap.utils.toArray<HTMLElement>('[data-hero-word]');
        gsap.from(words, {
          yPercent: 110,
          opacity: 0,
          stagger: 0.08,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.3
        });
      }

      if (bgRef.current && !prefersReducedMotion) {
        gsap.to(bgRef.current, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen overflow-hidden pt-28">
      <div ref={bgRef} className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero.svg"
          alt={lang === 'ar' ? 'بورتريه سينمائي بإضاءة درامية' : 'cinematic portrait with dramatic lighting'}
          fill
          priority
          className="object-cover object-center brightness-[0.42]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
      </div>
      <div className="container relative z-10 flex min-h-[60vh] flex-col justify-center gap-8 py-24">
        <p className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-muted backdrop-blur-xs">
          {copy.eyebrow}
        </p>
        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight sm:text-6xl lg:text-[clamp(3.5rem,4vw,4.5rem)]">
          {headlineWords.map((word, index) => (
            <span key={`${word}-${index}`} className="inline-block overflow-hidden align-baseline">
              <span data-hero-word className="inline-block">
                {word}{' '}
              </span>
            </span>
          ))}
        </h1>
        <p className="max-w-2xl text-lg text-muted lg:text-xl">{copy.subtitle}</p>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <MagneticButton glow href="#plan">
            {copy.primaryCta}
          </MagneticButton>
          <Link
            href="#stories"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-muted transition hover:border-accent hover:text-text"
          >
            {copy.secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

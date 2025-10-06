'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { dict, useLang } from '@/lib/i18n';
import { gsap, registerGsap } from '@/lib/gsap';

const Guide = () => {
  const { lang } = useLang();
  const copy = dict[lang].guide;
  const cardRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    registerGsap();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: prefersReducedMotion ? 0 : 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%'
        }
      });

      if (portraitRef.current && !prefersReducedMotion) {
        gsap.to(portraitRef.current, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section className="relative">
      <div className="container">
        <div ref={cardRef} className="glass relative mx-auto flex flex-col gap-8 overflow-hidden p-10 lg:flex-row">
          <div className="relative flex-1">
            <div ref={portraitRef} className="relative mx-auto h-80 w-72 overflow-hidden rounded-3xl border border-accent/20 bg-surface/60 shadow-[0_30px_60px_rgba(0,187,255,0.15)]">
              <Image
                src="/images/coach.svg"
                alt="Photography coach portrait"
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 320px, 280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
              <div className="absolute inset-0 border border-white/10" />
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-6">
            <h2 className="text-3xl font-semibold text-text md:text-4xl">{copy.title}</h2>
            <p className="text-lg text-muted">{copy.body}</p>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">{copy.highlight}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guide;

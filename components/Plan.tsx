'use client';

import { useEffect, useRef } from 'react';
import { dict, useLang } from '@/lib/i18n';
import { gsap, registerGsap } from '@/lib/gsap';

const icons = [
  (
    <svg key="fundamentals" className="h-10 w-10 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
      <circle cx="8" cy="15" r="2" />
      <circle cx="16" cy="15" r="2" />
    </svg>
  ),
  (
    <svg key="light" className="h-10 w-10 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3v4" />
      <path d="M5.22 5.22l2.83 2.83" />
      <path d="M3 12h4" />
      <path d="M19 12h4" />
      <path d="M16 8l2.83-2.83" />
      <circle cx="12" cy="12" r="5" />
      <path d="M10 18h4" />
    </svg>
  ),
  (
    <svg key="story" className="h-10 w-10 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 5h16v16H8l-4 4V5z" />
      <path d="M12 9h5" />
      <path d="M12 13h5" />
      <circle cx="9" cy="12" r="1" />
    </svg>
  )
];

const Plan = () => {
  const { lang } = useLang();
  const copy = dict[lang].plan;
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    registerGsap();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-plan-card]');
      gsap.from(cards, {
        y: prefersReducedMotion ? 0 : 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      });

      if (!prefersReducedMotion) {
        const highlight = cards[1];
        if (highlight) {
          gsap.fromTo(
            highlight,
            { boxShadow: '0 0 0 rgba(0, 187, 255, 0)' },
            {
              boxShadow: '0 0 40px rgba(0, 187, 255, 0.25)',
              duration: 1.4,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section id="plan" ref={sectionRef} className="relative">
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">{copy.title}</h2>
          <p className="text-muted">
            {dict[lang].guide.highlight}
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {copy.steps.map((step, index) => (
            <div
              key={step.title}
              data-plan-card
              className="card group relative flex flex-col gap-4 overflow-hidden p-6"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at top, rgba(0, 187, 255, 0.1), transparent 60%)' }} />
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                {icons[index]}
              </div>
              <h3 className="relative text-xl font-semibold">{step.title}</h3>
              <p className="relative text-sm text-muted">{step.description}</p>
              <button className="relative mt-auto w-fit text-xs uppercase tracking-[0.3em] text-accent">
                {step.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plan;

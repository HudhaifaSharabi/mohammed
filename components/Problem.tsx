'use client';

import { useEffect, useRef } from 'react';
import { dict, useLang } from '@/lib/i18n';
import { gsap, registerGsap } from '@/lib/gsap';

const Problem = () => {
  const { lang } = useLang();
  const copy = dict[lang].problem;
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const countersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    registerGsap();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      gsap.from('[data-problem-mask]', {
        clipPath: 'inset(0 0 100% 0)',
        duration: prefersReducedMotion ? 0.6 : 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      });

      if (!prefersReducedMotion) {
        countersRef.current.forEach((el, index) => {
          const value = Number(el.dataset.value ?? '1');
          gsap.fromTo(
            el,
            { innerText: 0 },
            {
              innerText: value,
              snap: { innerText: 1 },
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%'
              }
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section ref={sectionRef} id="stories" className="relative">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-3xl border border-line/60 bg-gradient-to-br from-surface/70 via-surface/40 to-surface/90 p-10" data-problem-mask>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,187,255,0.2),transparent_55%)] opacity-70" />
            <div className="relative z-10 flex flex-col gap-6">
              <h2 className="text-3xl font-semibold text-text md:text-4xl">{copy.title}</h2>
              <p className="max-w-xl text-base text-muted md:text-lg">{copy.body}</p>
            </div>
          </div>
          <div className="grid gap-6" data-problem-mask>
            {copy.pains.map((pain, index) => (
              <div key={pain} className="card relative overflow-hidden p-6">
                <span
                  ref={(el) => {
                    if (el) countersRef.current[index] = el;
                  }}
                  data-value={index + 1}
                  className="text-4xl font-bold text-accent"
                >
                  0
                </span>
                <p className="mt-2 text-lg text-muted">{pain}</p>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;

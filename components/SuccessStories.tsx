'use client';

import { useEffect, useRef } from 'react';
import { dict, useLang } from '@/lib/i18n';
import { gsap, registerGsap } from '@/lib/gsap';

const SuccessStories = () => {
  const { lang } = useLang();
  const copy = dict[lang].success;
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    registerGsap();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      gsap.from('[data-success-card]', {
        x: prefersReducedMotion ? 0 : 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section ref={sectionRef} className="relative">
      <div className="container">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">{copy.title}</h2>
        </div>
        <div className="mt-12 overflow-hidden">
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
            {copy.items.map((story, index) => (
              <div
                key={story.author}
                data-success-card
                className="group relative h-72 min-w-[280px] flex-1 snap-center overflow-hidden rounded-3xl border border-line/70 bg-surface/80"
              >
                <div className="absolute inset-0 flex h-full w-full flex-col transition [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  <div className="absolute inset-0 flex flex-col justify-between p-6 [backface-visibility:hidden]">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-accent">{lang === 'ar' ? 'قبل' : 'Before'}</p>
                      <p className="mt-3 text-lg text-muted">{story.before}</p>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-accent">{lang === 'ar' ? 'بعد' : 'After'}</p>
                      <p className="mt-3 text-lg text-text">{story.after}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-surface/90 via-surface/60 to-bg/90 p-6 text-left text-sm text-muted [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <p className="text-base italic text-text">{story.quote}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-accent-2">{story.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'classnames';
import { dict, useLang } from '@/lib/i18n';
import { gsap, registerGsap } from '@/lib/gsap';

const filters: Array<'all' | 'beginner' | 'pro'> = ['all', 'beginner', 'pro'];

const Workshops = () => {
  const { lang } = useLang();
  const copy = dict[lang].workshops;
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<'all' | 'beginner' | 'pro'>('all');

  useEffect(() => {
    if (!sectionRef.current) return;
    registerGsap();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-workshop-card]');
      gsap.from(cards, {
        y: prefersReducedMotion ? 0 : 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const filteredItems = useMemo(() => {
    if (filter === 'all') return copy.items;
    return copy.items.filter((item) => {
      if (filter === 'beginner') return item.level.toLowerCase().includes(lang === 'ar' ? 'مبت' : 'begin');
      return item.level.toLowerCase().includes(lang === 'ar' ? 'محترف' : 'pro');
    });
  }, [copy.items, filter, lang]);

  return (
    <section ref={sectionRef} id="workshops" className="relative">
      <div className="container">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">{copy.title}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((key) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={clsx(
                  'rounded-full border border-line px-4 py-2 text-xs uppercase tracking-[0.3em] transition',
                  filter === key ? 'border-accent text-text shadow-glow' : 'text-muted hover:border-accent hover:text-text'
                )}
              >
                {key === 'all' ? copy.filterAll : key === 'beginner' ? copy.filterBeginner : copy.filterPro}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {filteredItems.map((item) => (
            <article
              key={item.title}
              data-workshop-card
              className="card relative flex h-full flex-col gap-4 overflow-hidden p-6"
            >
              <span className="self-start rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-accent">
                {item.level}
              </span>
              <h3 className="text-xl font-semibold text-text">{item.title}</h3>
              <p className="text-sm text-muted">{item.date}</p>
              <p className="text-lg text-accent-2">{item.price}</p>
              <p className="mt-auto text-xs uppercase tracking-[0.3em] text-success">{item.seats}</p>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
            </article>
          ))}
        </div>
        <div className="mt-10 overflow-hidden rounded-full border border-line/70 bg-surface/70">
          <div className="flex animate-marquee gap-12 whitespace-nowrap px-6 py-3 text-xs uppercase tracking-[0.4em] text-muted">
            {[...Array(8)].map((_, index) => (
              <span key={index}>{copy.marquee}</span>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-marquee {
          animation: marquee 24s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Workshops;

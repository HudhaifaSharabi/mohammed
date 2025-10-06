'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { dict, useLang } from '@/lib/i18n';
import { gsap, registerGsap } from '@/lib/gsap';

const imageMap: Record<string, string> = {
  'Cinematic Portraits': '/images/categories/portrait.svg',
  'البورتريه السينمائي': '/images/categories/portrait.svg',
  'Fashion & Motion': '/images/categories/fashion.svg',
  'أزياء وحركة': '/images/categories/fashion.svg',
  Weddings: '/images/categories/wedding.svg',
  'حفلات الزفاف': '/images/categories/wedding.svg',
  Street: '/images/categories/street.svg',
  'الشارع': '/images/categories/street.svg',
  'Product Imaging': '/images/categories/product.svg',
  'تصوير المنتجات': '/images/categories/product.svg'
};

const Categories = () => {
  const { lang } = useLang();
  const copy = dict[lang].categories;
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    registerGsap();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsInteractive(window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion);

    const ctx = gsap.context(() => {
      const columns = gsap.utils.toArray<HTMLElement>('[data-category-column]');
      gsap.from(columns, {
        y: prefersReducedMotion ? 0 : (index) => (index as number) * 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  useEffect(() => {
    if (!isInteractive) return;

    const movers = cardsRef.current.map((card) => ({
      x: gsap.quickTo(card, 'x', { duration: 0.6, ease: 'power3.out' }),
      y: gsap.quickTo(card, 'y', { duration: 0.6, ease: 'power3.out' })
    }));

    let raf = 0;

    const handleMove = (event: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          const rect = card.getBoundingClientRect();
          const offsetX = event.clientX - (rect.left + rect.width / 2);
          const offsetY = event.clientY - (rect.top + rect.height / 2);
          const depth = 0.04 * ((index % 3) + 1);
          movers[index].x(offsetX * depth);
          movers[index].y(offsetY * depth);
          card.style.setProperty('--pointer-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
          card.style.setProperty('--pointer-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
        });
      });
    };

    const reset = () => {
      cardsRef.current.forEach((card, index) => {
        movers[index].x(0);
        movers[index].y(0);
      });
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', reset);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', reset);
    };
  }, [isInteractive]);

  return (
    <section ref={sectionRef} className="relative">
      <div className="container">
        <div className="flex flex-col gap-4 text-center">
          <p className="mx-auto max-w-2xl text-muted">{copy.subtitle}</p>
          <h2 className="text-3xl font-semibold md:text-4xl">{copy.title}</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3" aria-live="polite">
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} data-category-column className="grid gap-6">
              {copy.items
                .filter((_, itemIndex) => itemIndex % 3 === colIndex)
                .map((item, idx) => {
                  const globalIndex = copy.items.findIndex((candidate) => candidate.title === item.title);
                  return (
                    <div
                      key={item.title}
                      ref={(el) => {
                        if (el) cardsRef.current[globalIndex] = el;
                      }}
                      className="group relative overflow-hidden rounded-3xl border border-line/70 bg-surface/80 transition will-change-transform"
                      style={{
                        WebkitMaskImage:
                          'radial-gradient(240px at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(255,255,255,0.95), rgba(255,255,255,0.25) 65%, rgba(255,255,255,0) 100%)',
                        maskImage:
                          'radial-gradient(240px at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(255,255,255,0.95), rgba(255,255,255,0.25) 65%, rgba(255,255,255,0) 100%)'
                      }}
                    >
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={imageMap[item.title] ?? '/images/categories/portrait.svg'}
                          alt={item.title}
                          fill
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          sizes="(min-width: 1024px) 360px, 100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
                      </div>
                      <div className="relative flex flex-col gap-3 p-6">
                        <div className="flex items-center justify-between text-sm text-muted">
                          <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted">{copy.explore}</span>
                          <span className="text-accent-2">{item.count}</span>
                        </div>
                        <h3 className="text-2xl font-semibold text-text">{item.title}</h3>
                        <p className="text-sm text-muted">{item.description}</p>
                      </div>
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            'radial-gradient(280px at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(0,187,255,0.12), rgba(0,0,0,0.85))'
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

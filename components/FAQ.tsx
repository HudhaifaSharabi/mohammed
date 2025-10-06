'use client';

import { useState } from 'react';
import { dict, useLang } from '@/lib/i18n';

const FAQ = () => {
  const { lang } = useLang();
  const copy = dict[lang].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative" id="faq">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">{copy.title}</h2>
        </div>
        <div className="mt-10 space-y-4">
          {copy.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.q} className="card overflow-hidden">
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-lg text-text"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className="text-accent">{isOpen ? '-' : '+'}</span>
                </button>
                <div
                  className="grid overflow-hidden px-6 text-sm text-muted transition-[grid-template-rows] duration-500"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  aria-hidden={!isOpen}
                >
                  <div className="min-h-0 py-0 pb-4 leading-relaxed">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

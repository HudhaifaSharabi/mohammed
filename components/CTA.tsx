'use client';

import MagneticButton from './MagneticButton';
import { dict, useLang } from '@/lib/i18n';

const CTA = () => {
  const { lang } = useLang();
  const copy = dict[lang].cta;

  return (
    <section className="relative overflow-hidden rounded-[3rem] border border-line/60 bg-gradient-to-br from-bg via-surface/90 to-bg/80 py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,187,255,0.18),transparent_55%)]" />
      <div className="container relative z-10 flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-3xl text-3xl font-semibold md:text-4xl">{copy.title}</h2>
        <p className="max-w-2xl text-muted">{copy.subtitle}</p>
        <MagneticButton glow href="#contact">
          {copy.primaryCta}
        </MagneticButton>
      </div>
    </section>
  );
};

export default CTA;

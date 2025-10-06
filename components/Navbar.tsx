'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import clsx from 'classnames';
import MagneticButton from './MagneticButton';
import { dict, useLang } from '@/lib/i18n';

const Navbar = () => {
  const { lang, setLang } = useLang();
  const copy = dict[lang].navbar;
  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsSolid(window.scrollY > 64);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  return (
    <header
      className={clsx(
        'fixed top-0 z-40 w-full transition-colors duration-500',
        isSolid ? 'bg-surface/90 backdrop-blur-xl border-b border-line/80' : 'bg-transparent'
      )}
    >
      <nav className="container flex items-center justify-between py-5">
        <Link href="#hero" className="text-lg font-semibold tracking-wide text-text">
          {copy.logo}
        </Link>
        <div className="hidden items-center gap-10 text-sm font-medium uppercase tracking-[0.3em] text-muted/90 lg:flex">
          {copy.nav.map((item, index) => (
            <Link key={item} href={[ '#hero', '#stories', '#workshops', '#contact' ][index] ?? '#hero'} className="transition-colors hover:text-text">
              {item}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleLang}
            className="rounded-full border border-line bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted transition hover:border-accent hover:text-text"
            aria-label={lang === 'ar' ? 'تغيير اللغة' : 'Switch language'}
          >
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>
          <div className="hidden lg:block">
            <MagneticButton glow href="#contact">
              {copy.cta}
            </MagneticButton>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

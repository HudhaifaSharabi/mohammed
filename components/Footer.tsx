'use client';

import Link from 'next/link';
import { dict, useLang } from '@/lib/i18n';

const Footer = () => {
  const { lang } = useLang();
  const copy = dict[lang].footer;

  return (
    <footer id="contact" className="relative mt-20 border-t border-line/60 bg-surface/60 py-12">
      <div className="container grid gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold text-text">{copy.title}</h3>
          <p className="text-sm text-muted">{copy.rights}</p>
        </div>
        <div className="flex flex-col gap-4 text-sm text-muted">
          <a href={`mailto:${copy.email}`} className="text-text hover:text-accent">
            {copy.email}
          </a>
          <a href={`https://wa.me/${copy.phone.replace(/[^\d]/g, '')}`} className="text-text hover:text-accent">
            {copy.phone}
          </a>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-muted">
            {copy.socials.map((social) => (
              <Link key={social} href="#" className="hover:text-accent">
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 overflow-hidden border-t border-line/60 py-4">
        <div className="flex animate-marquee gap-12 text-xs uppercase tracking-[0.4em] text-muted">
          {copy.partners.map((partner) => (
            <span key={partner}>{partner}</span>
          ))}
          {copy.partners.map((partner) => (
            <span key={`${partner}-duplicate`}>{partner}</span>
          ))}
        </div>
      </div>
      <style jsx>{`
        .animate-marquee {
          animation: marqueePartners 24s linear infinite;
        }
        @keyframes marqueePartners {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

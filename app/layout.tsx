import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Tajawal } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { LangProvider, getInitialLangFromCookie, LANG_COOKIE } from '@/lib/i18n';
import SmoothScroller from '@/components/SmoothScroller';
import CursorViewfinder from '@/components/CursorViewfinder';
import LoaderCinematic from '@/components/LoaderCinematic';

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-ar',
  weight: ['400', '500', '700']
});

const geist = GeistSans({
  variable: '--font-en'
});

export const metadata: Metadata = {
  title: 'Storyframe Studio — Cinematic Photography Coaching',
  description:
    'Bilingual photography coaching experience built on StoryBrand narrative. Learn to craft cinematic stories in every frame.',
  metadataBase: new URL('https://example.com'),
  themeColor: '#0B0F12',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const initialLang = getInitialLangFromCookie(cookieStore.get(LANG_COOKIE)?.value ?? null);

  return (
    <html lang={initialLang} dir={initialLang === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${geist.variable} ${tajawal.variable} font-sans antialiased`}>
        <LangProvider defaultLang={initialLang}>
          <LoaderCinematic />
          <SmoothScroller>
            <CursorViewfinder />
            {children}
          </SmoothScroller>
        </LangProvider>
      </body>
    </html>
  );
}

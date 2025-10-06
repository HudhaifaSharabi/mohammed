'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type Dictionary = typeof dict;

export type Lang = 'ar' | 'en';

type LangContext = {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  t: (path: string) => string;
  setLang: (lang: Lang) => void;
};

export const LANG_STORAGE_KEY = 'photography-coach-lang';
export const LANG_COOKIE = 'pc_lang';

export const dict = {
  ar: {
    navbar: {
      logo: 'استوديو السرد',
      nav: ['الرئيسية', 'القصص', 'ورش العمل', 'تواصل'],
      cta: 'احجز جلسة استشارية'
    },
    hero: {
      eyebrow: 'مدرب التصوير السينمائي',
      title: 'لكل صورة قصة — دعني أعلّمك كيف تحكيها.',
      subtitle: 'دروس مباشرة، مراجعات شخصية، وتدريب عملي يحول رؤيتك إلى سرد بصري مؤثر.',
      primaryCta: 'ابدأ رحلتك',
      secondaryCta: 'شاهد الأعمال'
    },
    problem: {
      title: 'الصور الجميلة لا تكفي وحدها',
      body: 'صورك لا تعكس موهبتك؟ الإضاءة، التكوين، والسرد البصري هو الفرق.',
      pains: ['ضياع الهوية البصرية', 'إضاءة مربكة', 'قصص بلا إحساس']
    },
    guide: {
      title: '15 سنة خلف العدسة… اليوم خلفك أنت.',
      body: 'من الحملات العالمية إلى الورش الصغيرة، ساعدتُ أكثر من 500 مصور ومصورة على إطلاق أسلوبهم الخاص بثقة وذكاء سردي.',
      highlight: 'معتمد من أبل، سوني، وناشيونال جيوغرافيك'
    },
    plan: {
      title: 'خطة واضحة. تقدم محسوب.',
      steps: [
        {
          title: 'الأساسيات',
          description: 'تحكم في الكاميرا والإضاءة بلا تعقيد.',
          cta: 'تعرف أكثر'
        },
        {
          title: 'حرفة الضوء',
          description: 'اصنع مزاج المشهد بنور محسوب ودقيق.',
          cta: 'تعرف أكثر'
        },
        {
          title: 'القصة والأسلوب',
          description: 'ابنِ هوية سردية لا تُنسى في كل لقطة.',
          cta: 'تعرف أكثر'
        }
      ]
    },
    categories: {
      title: 'مهارات تبني أعمالك',
      subtitle: 'خمسة مسارات مدروسة لتطوير كل جانب من رؤيتك البصرية.',
      explore: 'استكشف',
      items: [
        {
          title: 'البورتريه السينمائي',
          count: '32 جلسة',
          description: 'إدارة المشاعر، التوجيه، والضوء الناعم.'
        },
        {
          title: 'أزياء وحركة',
          count: '18 مشروع',
          description: 'تجميد الطاقة وتنسيق اللون والحركة.'
        },
        {
          title: 'حفلات الزفاف',
          count: '24 قصة',
          description: 'سرد لحظات لا تتكرر بزوايا حميمية.'
        },
        {
          title: 'الشارع',
          count: '41 لقطة',
          description: 'صيد اللحظة وتوازن الضوء الطبيعي.'
        },
        {
          title: 'تصوير المنتجات',
          count: '27 إعداد',
          description: 'تفاصيل دقيقة وإضاءة تجارية جذابة.'
        }
      ]
    },
    success: {
      title: 'قصص نجاح تحكي عن نفسها',
      items: [
        {
          before: 'عميل بلا معرض أعمال',
          after: 'محفظة رقمية بيعت أول مجموعة خلال أسبوع.',
          quote: '"طبقت أسلوب السرد وتغير كل شيء، من التسعير إلى ثقة العميل."',
          author: 'سارة .ج — تصوير منتجات'
        },
        {
          before: 'صور زفاف عادية',
          after: 'ألبومات مميزة تضاعفت حجوزاتها ثلاث مرات.',
          quote: '"تعلمت كيف أقرأ الضوء وأحكي اللحظة. المتابعون أصبحوا عملاء."',
          author: 'خالد .م — تصوير حفلات'
        },
        {
          before: 'لقطات شارع مشتتة',
          after: 'سلسلة قصصية عرضت في معرض محلي.',
          quote: '"النقد الموجه والتمارين اليومية غيرت نظرتي للشارع."',
          author: 'ريم .س — تصوير شارع'
        }
      ]
    },
    workshops: {
      title: 'ورش تركز على التطبيق',
      filterAll: 'الكل',
      filterBeginner: 'مبتدئ',
      filterPro: 'محترف',
      marquee: 'مواعيد جديدة تفتح كل شهر — احجز مبكرًا',
      items: [
        {
          title: 'أساسيات الضوء المتحكم',
          level: 'مبتدئ',
          price: '450 ر.س',
          date: '15 مارس',
          seats: '6 مقاعد متبقية'
        },
        {
          title: 'سرد بصري متقدم',
          level: 'محترف',
          price: '720 ر.س',
          date: '27 مارس',
          seats: '4 مقاعد متبقية'
        },
        {
          title: 'تصميم جلسة أزياء كاملة',
          level: 'محترف',
          price: '890 ر.س',
          date: '12 أبريل',
          seats: '3 مقاعد متبقية'
        }
      ]
    },
    cta: {
      title: 'كاميرتك تستحق أكثر. وأنت كذلك.',
      subtitle: 'لنأخذ رؤيتك من فكرة عابرة إلى قصة معلّقة في ذاكرة جمهورك.',
      primaryCta: 'ابدأ الاستشارة'
    },
    faq: {
      title: 'أسئلة متكررة',
      items: [
        {
          q: 'هل البرنامج مناسب للمبتدئين تمامًا؟',
          a: 'نعم، نبني أساسًا صلبًا قبل الانتقال للتقنيات السينمائية.'
        },
        {
          q: 'كم يستغرق التطور عادة؟',
          a: 'خلال ثلاثة أشهر ترى اختلافًا واضحًا في أعمالك اليومية.'
        },
        {
          q: 'هل الدروس مباشرة أم مسجلة؟',
          a: 'مزيج من جلسات مباشرة مسجلة للعودة إليها في أي وقت.'
        },
        {
          q: 'هل أحتاج معدات احترافية؟',
          a: 'أي كاميرا قابلة للتحكم اليدوي تكفي للانطلاق.'
        },
        {
          q: 'كيف يتم تقييم التقدم؟',
          a: 'من خلال مراجعات أسبوعية ومشاريع تطبيقية قصيرة.'
        },
        {
          q: 'هل يوجد مجتمع للمتدربين؟',
          a: 'نعم، تحصل على وصول لمجتمع خاص للنقاش والتغذية الراجعة.'
        }
      ]
    },
    footer: {
      title: 'أطلق قصتك البصرية',
      email: 'hello@storyframe.co',
      phone: '+966 55 555 5555',
      socials: ['إنستغرام', 'يوتيوب', 'لينكدإن'],
      rights: '© 2024 استوديو السرد. جميع الحقوق محفوظة.',
      partners: ['سوني', 'لايكا', 'أدوبي', 'كانون']
    },
    buttons: {
      learnMore: 'تعرف أكثر',
      explore: 'استكشف'
    }
  },
  en: {
    navbar: {
      logo: 'Storyframe Studio',
      nav: ['Home', 'Stories', 'Workshops', 'Contact'],
      cta: 'Book a Mentoring Call'
    },
    hero: {
      eyebrow: 'Cinematic Photography Coach',
      title: 'Every photo is a story — I’ll teach you to tell it.',
      subtitle: 'Live coaching, guided critiques, and hands-on drills that transform your eye into a compelling visual narrative.',
      primaryCta: 'Start Your Journey',
      secondaryCta: 'See Work'
    },
    problem: {
      title: 'Beautiful shots aren’t enough',
      body: 'Your photos don’t match your talent? Lighting, composition, and visual narrative are the missing link.',
      pains: ['Unclear visual identity', 'Confusing light', 'Stories without emotion']
    },
    guide: {
      title: '15 years behind the lens… now behind you.',
      body: 'From global campaigns to intimate workshops, I’ve helped 500+ photographers launch their signature style with confidence and story sense.',
      highlight: 'Certified mentor for Apple, Sony, and National Geographic crews'
    },
    plan: {
      title: 'A clear plan. Measurable momentum.',
      steps: [
        {
          title: 'Fundamentals',
          description: 'Master your camera and light without overwhelm.',
          cta: 'Learn more'
        },
        {
          title: 'Light Craft',
          description: 'Shape mood with deliberate, cinematic lighting.',
          cta: 'Learn more'
        },
        {
          title: 'Story & Style',
          description: 'Build a signature narrative voice in every frame.',
          cta: 'Learn more'
        }
      ]
    },
    categories: {
      title: 'Disciplines that elevate your portfolio',
      subtitle: 'Five crafted tracks to grow every aspect of your visual voice.',
      explore: 'Explore',
      items: [
        {
          title: 'Cinematic Portraits',
          count: '32 Sessions',
          description: 'Direct emotion with sculpted, soft light.'
        },
        {
          title: 'Fashion & Motion',
          count: '18 Campaigns',
          description: 'Freeze energy while balancing color and flow.'
        },
        {
          title: 'Weddings',
          count: '24 Stories',
          description: 'Capture once-in-a-lifetime scenes with intimacy.'
        },
        {
          title: 'Street',
          count: '41 Frames',
          description: 'Hunt the decisive moment in natural light.'
        },
        {
          title: 'Product Imaging',
          count: '27 Sets',
          description: 'Reveal precision details with commercial appeal.'
        }
      ]
    },
    success: {
      title: 'Success stories that speak volumes',
      items: [
        {
          before: 'Client without a portfolio',
          after: 'Launched a digital gallery and sold the first series in a week.',
          quote: '“Applying the narrative framework changed everything—from pricing to client trust.”',
          author: 'Sarah G. — Product Photographer'
        },
        {
          before: 'Ordinary wedding galleries',
          after: 'Signature albums that tripled bookings.',
          quote: '“I learned to read light and tell the moment. Followers became paying clients.”',
          author: 'Khaled M. — Wedding Photographer'
        },
        {
          before: 'Scattered street shots',
          after: 'Story-driven series exhibited locally.',
          quote: '“Targeted critiques and daily drills reframed the way I see the street.”',
          author: 'Reem S. — Street Photographer'
        }
      ]
    },
    workshops: {
      title: 'Workshops built for doing',
      filterAll: 'All',
      filterBeginner: 'Beginner',
      filterPro: 'Pro',
      marquee: 'New cohorts open monthly — reserve your seat early',
      items: [
        {
          title: 'Controlled Lighting Fundamentals',
          level: 'Beginner',
          price: '$120',
          date: '15 March',
          seats: '6 seats left'
        },
        {
          title: 'Advanced Visual Storytelling',
          level: 'Pro',
          price: '$190',
          date: '27 March',
          seats: '4 seats left'
        },
        {
          title: 'Designing a Full Fashion Set',
          level: 'Pro',
          price: '$240',
          date: '12 April',
          seats: '3 seats left'
        }
      ]
    },
    cta: {
      title: 'Your camera deserves more. So do you.',
      subtitle: 'Let’s shape your vision from a fleeting idea into a story your audience remembers.',
      primaryCta: 'Start the consultation'
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          q: 'Is the program beginner friendly?',
          a: 'Absolutely. We build a strong foundation before cinematic techniques.'
        },
        {
          q: 'How fast will I improve?',
          a: 'Within three months you will notice a dramatic shift in everyday work.'
        },
        {
          q: 'Are lessons live or recorded?',
          a: 'A blend of live coaching plus recordings you can revisit anytime.'
        },
        {
          q: 'Do I need pro gear?',
          a: 'Any camera with manual control is enough to get started.'
        },
        {
          q: 'How is progress reviewed?',
          a: 'Weekly critiques and applied micro-projects keep you accountable.'
        },
        {
          q: 'Is there a student community?',
          a: 'Yes, you gain access to a private community for feedback and collaboration.'
        }
      ]
    },
    footer: {
      title: 'Launch your visual narrative',
      email: 'hello@storyframe.co',
      phone: '+966 55 555 5555',
      socials: ['Instagram', 'YouTube', 'LinkedIn'],
      rights: '© 2024 Storyframe Studio. All rights reserved.',
      partners: ['Sony', 'Leica', 'Adobe', 'Canon']
    },
    buttons: {
      learnMore: 'Learn more',
      explore: 'Explore'
    }
  }
} as const;

const LanguageContext = createContext<LangContext | null>(null);

const fallbackLang: Lang = 'en';

function getDirection(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

function translate(path: string, lang: Lang): string {
  const keys = path.split('.');
  let current: any = dict[lang];
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key as keyof typeof current];
    } else {
      return path;
    }
  }
  if (typeof current === 'string') return current;
  return path;
}

type ProviderProps = {
  children: ReactNode;
  defaultLang?: Lang;
};

export function LangProvider({ children, defaultLang }: ProviderProps) {
  const [lang, setLangState] = useState<Lang>(defaultLang ?? fallbackLang);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
    if (stored && stored !== lang) {
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = lang;
    document.documentElement.dir = getDirection(lang);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
      document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    } catch (error) {
      console.warn('language persistence error', error);
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
  }, []);

  const value = useMemo<LangContext>(() => ({
    lang,
    dir: getDirection(lang),
    t: (path: string) => translate(path, lang),
    setLang
  }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LangContext {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLang must be used within LangProvider');
  }
  return context;
}

export function getInitialLangFromCookie(cookieValue?: string | null): Lang {
  if (!cookieValue) return fallbackLang;
  const value = cookieValue.split(';')[0] as Lang;
  return value === 'ar' || value === 'en' ? value : fallbackLang;
}

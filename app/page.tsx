import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Guide from '@/components/Guide';
import Plan from '@/components/Plan';
import Categories from '@/components/Categories';
import SuccessStories from '@/components/SuccessStories';
import Workshops from '@/components/Workshops';
import CTA from '@/components/CTA';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="space-y-24">
        <Hero />
        <Problem />
        <Guide />
        <Plan />
        <Categories />
        <SuccessStories />
        <Workshops />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

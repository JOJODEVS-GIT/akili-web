import { Navbar }            from '@/components/landing/Navbar';
import { Hero }              from '@/components/landing/Hero';
import { Features }          from '@/components/landing/Features';
import { HowItWorks }        from '@/components/landing/HowItWorks';
import { UseCases }          from '@/components/landing/UseCases';
import { Pricing }           from '@/components/landing/Pricing';
import { CTA }               from '@/components/landing/CTA';
import { Footer }            from '@/components/landing/Footer';
import { SectionSeparator }  from '@/components/landing/SectionSeparator';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-akili-papyrus">
      <Navbar />
      <Hero />
      <SectionSeparator />
      <Features />
      <SectionSeparator />
      <HowItWorks />
      <SectionSeparator />
      <UseCases />
      <SectionSeparator />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

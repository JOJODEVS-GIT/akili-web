import { Navbar }              from '@/components/landing/Navbar';
import { Hero }                from '@/components/landing/Hero';
import { IntegrationsMarquee } from '@/components/landing/IntegrationsMarquee';
import { Features }            from '@/components/landing/Features';
import { HowItWorks }          from '@/components/landing/HowItWorks';
import { ProductShowcase }     from '@/components/landing/ProductShowcase';
import { TemplatesGallery }    from '@/components/landing/TemplatesGallery';
import { UseCases }            from '@/components/landing/UseCases';
import { Testimonials }        from '@/components/landing/Testimonials';
import { Manifesto }           from '@/components/landing/Manifesto';
import { Pricing }             from '@/components/landing/Pricing';
import { Security }            from '@/components/landing/Security';
import { Comparison }          from '@/components/landing/Comparison';
import { FAQ }                 from '@/components/landing/FAQ';
import { CTA }                 from '@/components/landing/CTA';
import { Footer }              from '@/components/landing/Footer';
import { SectionSeparator }    from '@/components/landing/SectionSeparator';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-akili-papyrus">
      <Navbar />
      <Hero />
      <SectionSeparator />
      <Features />
      <IntegrationsMarquee />
      <SectionSeparator />
      <HowItWorks />
      <SectionSeparator />
      <ProductShowcase />
      <SectionSeparator />
      <TemplatesGallery />
      <SectionSeparator />
      <UseCases />
      <SectionSeparator />
      <Testimonials />
      <Manifesto />
      <SectionSeparator />
      <Pricing />
      <Security />
      <SectionSeparator onDark />
      <Comparison />
      <SectionSeparator />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

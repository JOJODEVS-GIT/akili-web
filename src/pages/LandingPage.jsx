/**
 * LandingPage — version courte (7 sections au lieu de 15).
 *
 * Architecture hub & spokes inspirée d'Activepieces :
 * - Cette page reste le point d'entrée principal (le HUB)
 * - Les sections détaillées (ProductShowcase, Manifesto, Security, FAQ,
 *   Comparison, etc.) ont été déplacées vers leurs pages spokes dédiées
 * - Chaque section qui reste sur la landing pointe vers son spoke via
 *   un lien "Voir tout →" pour les visiteurs qui veulent creuser
 *
 * Sections gardées :
 *   1. Hero
 *   2. Features (3 piliers)
 *   3. IntegrationsMarquee (avec lien vers /integrations)
 *   4. HowItWorks (3 étapes synthétiques)
 *   5. Testimonials (mur de quotes)
 *   6. Pricing (avec lien vers /tarifs si on a une page dédiée plus tard)
 *   7. CTA + Footer
 *
 * Sortis vers spokes :
 *   - ProductShowcase  → /produit
 *   - TemplatesGallery → /templates
 *   - UseCases         → /produit (cas d'usage étendus là-bas)
 *   - Manifesto        → /manifesto
 *   - Security         → /securite
 *   - Comparison       → /comparaisons/zapier
 *   - FAQ              → /faq (à créer plus tard) ou page contact
 */
import { Navbar }              from '@/components/landing/Navbar';
import { Hero }                from '@/components/landing/Hero';
import { Features }            from '@/components/landing/Features';
import { IntegrationsMarquee } from '@/components/landing/IntegrationsMarquee';
import { HowItWorks }          from '@/components/landing/HowItWorks';
import { Testimonials }        from '@/components/landing/Testimonials';
import { Pricing }             from '@/components/landing/Pricing';
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
      <Testimonials />
      <SectionSeparator />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

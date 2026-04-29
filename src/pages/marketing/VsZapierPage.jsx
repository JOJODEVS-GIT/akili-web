/**
 * /comparaisons/zapier — Page SEO comparaison directe Akili vs Zapier.
 * URL juteuse pour Google : "Akili vs Zapier" et "alternative Zapier français".
 */
import { MarketingLayout } from '@/components/marketing/MarketingLayout';
import { SpokeHero } from '@/components/marketing/SpokeHero';
import { Comparison } from '@/components/landing/Comparison';
import { FAQ } from '@/components/landing/FAQ';
import { CTA } from '@/components/landing/CTA';

export default function VsZapierPage() {
  return (
    <MarketingLayout>
      <SpokeHero
        eyebrow="· Akili vs Zapier ·"
        title={
          <>
            L'alternative française
            <br />
            <span className="text-akili-coral">à Zapier.</span>
          </>
        }
        subtitle="Honnête sur ce qu'on fait mieux, honnête sur ce qu'on a moins. Voici la comparaison axe par axe — langue, prix, support, contexte africain, intégrations."
        cta={{ label: 'Essayer Akili gratuitement', href: '/signup' }}
        secondaryCta={{ label: 'Voir tous les plans', href: '/tarifs' }}
      />

      <Comparison />
      <FAQ />
      <CTA />
    </MarketingLayout>
  );
}

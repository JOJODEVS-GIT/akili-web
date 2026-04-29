/**
 * /produit — Tour produit (mockup dashboard + features détaillées + use cases)
 * STUB en attente de PR #19 qui le remplira avec ProductShowcase + HowItWorks + UseCases.
 */
import { MarketingLayout } from '@/components/marketing/MarketingLayout';
import { SpokeHero } from '@/components/marketing/SpokeHero';
import { ProductShowcase } from '@/components/landing/ProductShowcase';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { UseCases } from '@/components/landing/UseCases';
import { CTA } from '@/components/landing/CTA';

export default function ProduitPage() {
  return (
    <MarketingLayout>
      <SpokeHero
        eyebrow="· Tour produit ·"
        title={
          <>
            Voilà comment Akili
            <br />
            <span className="text-akili-coral">te rend tes heures.</span>
          </>
        }
        subtitle="Du clic à l'exécution en moins de 60 secondes. Un dashboard clair, des templates qui parlent, et une dataviz qui te dit où tu en es vraiment."
        cta={{ label: 'Démarrer gratuitement', href: '/signup' }}
        secondaryCta={{ label: 'Voir les tarifs', href: '/tarifs' }}
      />

      <ProductShowcase />
      <HowItWorks />
      <UseCases />
      <CTA />
    </MarketingLayout>
  );
}

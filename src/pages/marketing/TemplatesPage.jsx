/**
 * /templates — Catalogue complet des 20 templates filtrables.
 * Réutilise TemplatesGallery existante (qui montrera les 20 et pas juste 8).
 */
import { MarketingLayout } from '@/components/marketing/MarketingLayout';
import { SpokeHero } from '@/components/marketing/SpokeHero';
import { TemplatesGallery } from '@/components/landing/TemplatesGallery';
import { CTA } from '@/components/landing/CTA';

export default function TemplatesPage() {
  return (
    <MarketingLayout>
      <SpokeHero
        eyebrow="· Bibliothèque de templates ·"
        title={
          <>
            Vingt automatisations,
            <br />
            <span className="text-akili-coral">prêtes en 60 secondes.</span>
          </>
        }
        subtitle="Pas envie de partir de zéro ? Pioche un template testé en production, branche tes outils, et c'est parti. Tous gratuits, tous personnalisables."
        cta={{ label: 'Démarrer gratuitement', href: '/signup' }}
      />

      <TemplatesGallery />
      <CTA />
    </MarketingLayout>
  );
}

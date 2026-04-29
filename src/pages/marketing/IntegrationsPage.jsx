/**
 * /integrations — Catalogue des 21 intégrations (Marquee + grille filtrable + roadmap africaine).
 * STUB en attente de PR #19 — pour l'instant on réutilise IntegrationsMarquee.
 */
import { MarketingLayout } from '@/components/marketing/MarketingLayout';
import { SpokeHero } from '@/components/marketing/SpokeHero';
import { IntegrationsMarquee } from '@/components/landing/IntegrationsMarquee';
import { IntegrationsGrid } from '@/components/marketing/IntegrationsGrid';
import { CTA } from '@/components/landing/CTA';

export default function IntegrationsPage() {
  return (
    <MarketingLayout>
      <SpokeHero
        eyebrow="· Intégrations ·"
        title={
          <>
            21 outils branchés,
            <br />
            <span className="text-akili-coral">10 nouveaux chaque trimestre.</span>
          </>
        }
        subtitle="Tu connectes Gmail, Drive, Stripe, Slack, Notion, GitHub, Vercel, Postgres et 13 autres en deux clics via OAuth officiel. Wave, Orange Money et MTN MoMo arrivent au Q3 2026."
        cta={{ label: 'Connecter mes outils', href: '/signup' }}
        secondaryCta={{ label: 'Voir le catalogue', href: '#catalogue' }}
      />

      <IntegrationsMarquee />
      <IntegrationsGrid />
      <CTA />
    </MarketingLayout>
  );
}

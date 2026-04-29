/**
 * /securite — Page sécurité dédiée (4 piliers + uptime stats + lien status).
 */
import { MarketingLayout } from '@/components/marketing/MarketingLayout';
import { SpokeHero } from '@/components/marketing/SpokeHero';
import { Security } from '@/components/landing/Security';
import { CTA } from '@/components/landing/CTA';

export default function SecuritePage() {
  return (
    <MarketingLayout>
      <SpokeHero
        dark
        eyebrow="· Confiance & sécurité ·"
        title={
          <>
            Tes données ne dorment
            <br />
            <span className="text-akili-or">jamais d'un œil.</span>
          </>
        }
        subtitle="Chiffrement de bout en bout, hébergement européen, OAuth officiel sur toutes les intégrations, audit log complet. Voilà comment on protège ton compte, concrètement."
        cta={{ label: 'Voir le détail technique', href: '#piliers' }}
        secondaryCta={{ label: 'Status page', href: '/status' }}
      />

      <Security />
      <CTA />
    </MarketingLayout>
  );
}

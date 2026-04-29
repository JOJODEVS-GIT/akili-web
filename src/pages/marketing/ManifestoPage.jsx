/**
 * /manifesto — Page éditoriale "Pourquoi Akili" sur fond Indigo Nuit.
 */
import { MarketingLayout } from '@/components/marketing/MarketingLayout';
import { Manifesto } from '@/components/landing/Manifesto';
import { CTA } from '@/components/landing/CTA';

export default function ManifestoPage() {
  return (
    <MarketingLayout>
      {/* Pas de SpokeHero ici — Manifesto a son propre design éditorial pleine largeur */}
      <Manifesto />
      <CTA />
    </MarketingLayout>
  );
}

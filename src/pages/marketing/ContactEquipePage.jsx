/**
 * /contact-equipe — Page contact commercial / enterprise.
 * Différent de /contact (générique support) — celui-ci est pour les ventes B2B.
 * STUB pour l'instant — formulaire complet en PR #19.
 */
import { Link } from 'react-router-dom';
import { MarketingLayout } from '@/components/marketing/MarketingLayout';
import { SpokeHero } from '@/components/marketing/SpokeHero';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Buildings, Headset, EnvelopeSimple } from '@phosphor-icons/react';

export default function ContactEquipePage() {
  return (
    <MarketingLayout>
      <SpokeHero
        eyebrow="· Parler à l'équipe ·"
        title={
          <>
            On répond aux entreprises,
            <br />
            <span className="text-akili-coral">aux ONG, aux PME.</span>
          </>
        }
        subtitle="Tu as une équipe, des besoins de gouvernance, ou tu veux voir si Akili passe ta sécu interne ? On te répond directement, en français, sous 4 h."
      />

      <section className="py-22 bg-akili-papyrus">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="flat" padding="lg" className="text-center">
              <span className="inline-flex w-12 h-12 rounded-akili bg-akili-coral-50 text-akili-coral items-center justify-center">
                <Buildings size={24} weight="duotone" />
              </span>
              <h3 className="font-display font-extrabold text-lg mt-5">Demande de démo</h3>
              <p className="font-sans text-sm text-akili-charbon-soft mt-2 leading-relaxed">
                Présentation 30 min en visio avec un membre de l'équipe.
              </p>
              <a
                href="mailto:hello@akili.app?subject=Demande%20de%20démo%20Akili"
                className="font-display font-bold text-sm text-akili-coral hover:text-akili-coral-700 transition-colors mt-4 inline-block"
              >
                Réserver →
              </a>
            </Card>

            <Card variant="flat" padding="lg" className="text-center">
              <span className="inline-flex w-12 h-12 rounded-akili bg-akili-or-50 text-akili-or-700 items-center justify-center">
                <Headset size={24} weight="duotone" />
              </span>
              <h3 className="font-display font-extrabold text-lg mt-5">Support technique</h3>
              <p className="font-sans text-sm text-akili-charbon-soft mt-2 leading-relaxed">
                Une question sur ton compte, un bug, une intégration qui coince ?
              </p>
              <a
                href="mailto:support@akili.app?subject=Support%20Akili"
                className="font-display font-bold text-sm text-akili-coral hover:text-akili-coral-700 transition-colors mt-4 inline-block"
              >
                Écrire au support →
              </a>
            </Card>

            <Card variant="flat" padding="lg" className="text-center">
              <span className="inline-flex w-12 h-12 rounded-akili bg-akili-indigo-50 text-akili-indigo items-center justify-center">
                <EnvelopeSimple size={24} weight="duotone" />
              </span>
              <h3 className="font-display font-extrabold text-lg mt-5">Presse & partenariats</h3>
              <p className="font-sans text-sm text-akili-charbon-soft mt-2 leading-relaxed">
                Journalistes, partenaires, intégrations potentielles.
              </p>
              <a
                href="mailto:press@akili.app?subject=Presse%20Akili"
                className="font-display font-bold text-sm text-akili-coral hover:text-akili-coral-700 transition-colors mt-4 inline-block"
              >
                press@akili.app →
              </a>
            </Card>
          </div>

          <p className="text-center font-sans text-sm text-akili-charbon-mute mt-12">
            On répond aux heures Afrique de l'Ouest (UTC+0/+1), sous 4 h en moyenne.
            <br />
            <Link to="/contact" className="text-akili-coral hover:underline font-semibold">
              Formulaire de contact générique →
            </Link>
          </p>
        </Container>
      </section>
    </MarketingLayout>
  );
}

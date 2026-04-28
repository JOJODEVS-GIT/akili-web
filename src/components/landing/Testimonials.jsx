/**
 * Testimonials — Mur de témoignages avec 2 marquees infinies inversées.
 *
 * Inspiré du design "Smartwave" (Pinterest) :
 *  - Header asymétrique 2 colonnes (titre gauche / desc droite)
 *  - 2 rangées de cards qui défilent en sens opposés sur desktop
 *  - Cards alternées en 3 couleurs (corail / or / blanc) sur fond plat
 *  - Mini-card flottante blanche avec photo + nom + rôle + drapeau
 *  - Gros guillemet décoratif gris clair en bas-gauche
 *  - Mobile : stack vertical 4 cards, pas de marquee (lisibilité)
 *
 * Photos : pravatar.cc (placeholder responsable). À remplacer par les
 * vraies photos des utilisateurs beta avec leur consentement à la sortie
 * production.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Quotes } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/cn';

// Photos placeholder via pravatar.cc — à swap avec les vrais témoignages user à la prod
const photo = (slug) => `https://i.pravatar.cc/200?u=akili-${slug}`;

const QUOTES = [
  {
    body: "Avant Akili, je passais le dimanche soir à préparer mes factures Stripe. Maintenant, je dors. Littéralement.",
    name: 'Aïcha Diallo',
    role: 'Freelance design · Cotonou',
    flag: '🇧🇯',
    photo: photo('aicha'),
    initials: 'AD',
    tone: 'coral',
  },
  {
    body: "On a remplacé Zapier en deux semaines. Moins cher, en français, et le support répond — pas un bot. C'est ça la différence.",
    name: 'Olusola Adeyemi',
    role: 'CTO · agence digitale, Lagos',
    flag: '🇳🇬',
    photo: photo('olusola'),
    initials: 'OA',
    tone: 'or',
  },
  {
    body: "Le template de backup BDD m'a sauvé la vie le mois dernier. 5 minutes après le crash prod, j'avais la sauvegarde de la nuit.",
    name: 'Mamadou Sow',
    role: 'Lead dev · scale-up fintech, Dakar',
    flag: '🇸🇳',
    photo: photo('mamadou'),
    initials: 'MS',
    tone: 'plain',
  },
  {
    body: "Les relances factures J+7, J+15, J+30 envoient seules. J'ai récupéré 4 jours de boulot par mois. Je m'en remets pas.",
    name: 'Fatou Koné',
    role: "Comptable PME · Abidjan",
    flag: '🇨🇮',
    photo: photo('fatou'),
    initials: 'FK',
    tone: 'or',
  },
  {
    body: "12 € par mois pour des automatisations illimitées vs Zapier qui me coûtait 50 €. La math est vite faite.",
    name: 'Kwame Mensah',
    role: 'Indie hacker · Accra',
    flag: '🇬🇭',
    photo: photo('kwame'),
    initials: 'KM',
    tone: 'plain',
  },
  {
    body: "Onboarding en 10 minutes, première automatisation en 30. C'est l'outil le mieux documenté que j'ai utilisé cette année.",
    name: 'Amina Wanjiru',
    role: 'Ops manager · startup Nairobi',
    flag: '🇰🇪',
    photo: photo('amina'),
    initials: 'AW',
    tone: 'coral',
  },
  {
    body: "OAuth officiel partout, hébergement Frankfurt, audit log complet. Pour un produit pensé en Afrique, le niveau sécu est sérieux.",
    name: 'Ibrahim Touré',
    role: 'Dev backend solo · Bamako',
    flag: '🇲🇱',
    photo: photo('ibrahim'),
    initials: 'IT',
    tone: 'or',
  },
  {
    body: "Mon flow Notion ↔ Calendar ↔ Buffer tourne tout seul depuis 3 mois. Plus jamais à coller des liens à la main.",
    name: 'Léa Mbeki',
    role: 'Designer & créatrice de contenu · Paris',
    flag: '🇫🇷',
    photo: photo('lea'),
    initials: 'LM',
    tone: 'coral',
  },
];

const TONES = {
  coral: 'bg-akili-coral-50',
  or:    'bg-akili-or-50',
  plain: 'bg-white',
};

// Avatar avec fallback initiales si la photo ne charge pas
function Avatar({ src, alt, initials }) {
  const [errored, setErrored] = useState(false);
  if (errored || !src) {
    return (
      <span className="shrink-0 w-10 h-10 rounded-full bg-akili-indigo text-akili-or font-display font-extrabold text-[12px] flex items-center justify-center">
        {initials}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      width={40}
      height={40}
      loading="lazy"
      onError={() => setErrored(true)}
      className="shrink-0 w-10 h-10 rounded-full object-cover bg-akili-papyrus-deep"
    />
  );
}

function TestimonialCard({ q }) {
  return (
    <article
      className={cn(
        'shrink-0 w-[340px] sm:w-[400px] rounded-3xl p-6 sm:p-7 relative flex flex-col',
        TONES[q.tone]
      )}
    >
      {/* Eyebrow Akili */}
      <span className="font-display font-bold text-[10px] tracking-[0.2em] uppercase text-akili-charbon-mute">
        · Témoignage ·
      </span>

      {/* Body */}
      <p className="font-sans text-[14.5px] leading-[1.6] text-akili-charbon mt-4">
        {q.body}
      </p>

      {/* Footer : guillemet décoratif + mini-card avatar */}
      <div className="mt-7 flex items-end justify-between gap-3">
        <Quotes
          size={42}
          weight="fill"
          className="text-akili-charbon-mute opacity-25 -mb-1 shrink-0"
        />
        <div className="flex items-center gap-2.5 bg-white rounded-2xl pl-2 pr-3.5 py-2 shadow-akili-sm border border-akili-line/40 min-w-0">
          <Avatar src={q.photo} alt={q.name} initials={q.initials} />
          <div className="min-w-0">
            <div className="font-display font-bold text-[13px] text-akili-charbon flex items-center gap-1.5 truncate">
              {q.name}
              <span className="text-base leading-none shrink-0" aria-hidden>{q.flag}</span>
            </div>
            <div className="font-sans text-[11px] text-akili-charbon-mute truncate">
              {q.role}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="group flex overflow-hidden">
      <div
        className={cn(
          'flex shrink-0 gap-5 pr-5 will-change-transform',
          reverse ? 'animate-marquee-slow-reverse' : 'animate-marquee-slow',
          'group-hover:[animation-play-state:paused]'
        )}
      >
        {doubled.map((q, i) => (
          <TestimonialCard key={`${q.name}-${i}`} q={q} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  // Split en 2 rangées différenciées (variété entre haut et bas)
  const rowTop    = QUOTES.slice(0, 4);
  const rowBottom = QUOTES.slice(4, 8);

  // Subset mobile (4 plus représentatives)
  const mobileSet = [QUOTES[0], QUOTES[1], QUOTES[2], QUOTES[5]];

  return (
    <section id="temoignages" className="py-30 bg-akili-papyrus relative overflow-hidden">
      <Container size="xl" className="relative">
        {/* Header asymétrique 2 colonnes — inspiré du Pinterest ref */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
              · Témoignages ·
            </span>
            <h2 className="font-display font-extrabold text-[44px] sm:text-[56px] leading-[1.02] tracking-[-0.03em] mt-4 text-balance">
              Ce qu'on entend
              <span className="block text-akili-coral">de Cotonou à Paris.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-base lg:text-[17px] leading-[1.65] text-akili-charbon-soft max-w-md lg:pb-3"
          >
            Témoignages collectés auprès de nos utilisateurs beta entre Cotonou,
            Lagos, Dakar, Abidjan et Paris. Des freelances, des CTO, des comptables,
            des indie hackers — un seul point commun : ils ont récupéré leur temps.
          </motion.p>
        </div>
      </Container>

      {/* Mobile : stack vertical 4 cards, pas de marquee */}
      <div className="md:hidden mt-12 px-4 flex flex-col gap-4">
        {mobileSet.map((q, i) => (
          <motion.div
            key={q.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <TestimonialCard q={q} />
          </motion.div>
        ))}
      </div>

      {/* Desktop : 2 marquees inversées + masques fade latéraux */}
      <div className="hidden md:block mt-14 relative">
        {/* Masques fade gauche/droite */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 lg:w-40"
          style={{
            background:
              'linear-gradient(to right, rgb(249, 243, 230) 0%, rgba(249, 243, 230, 0) 100%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 lg:w-40"
          style={{
            background:
              'linear-gradient(to left, rgb(249, 243, 230) 0%, rgba(249, 243, 230, 0) 100%)',
          }}
        />

        <div className="flex flex-col gap-5">
          <MarqueeRow items={rowTop} />
          <MarqueeRow items={rowBottom} reverse />
        </div>
      </div>
    </section>
  );
}

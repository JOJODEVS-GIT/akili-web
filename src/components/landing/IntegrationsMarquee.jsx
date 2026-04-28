/**
 * IntegrationsMarquee — Logo cloud en défilement infini.
 *
 * Stratégie technique :
 *  - Seamless loop  : on duplique le set de logos et on translate -50%
 *                     en linear-infinite → boucle parfaite sans saut.
 *  - GPU-accelerated: animation via `transform: translateX()` (pas de margin).
 *  - Linear timing  : courbe linéaire pour vitesse constante entre cycles.
 *  - Polish         : masque latéral fade-out + pause au hover.
 *  - 2 lignes inversées pour densité visuelle sans accélérer.
 */
import { motion } from 'framer-motion';
import {
  SiGmail, SiGoogledrive, SiStripe, SiSlack, SiNotion, SiGithub, SiDiscord,
  SiGooglecalendar, SiGooglesheets, SiPostgresql, SiX, SiVercel, SiToggl,
  SiAirtable, SiTrello, SiZoom, SiDropbox, SiLinear, SiFigma, SiAsana,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import { Container } from '@/components/ui/Container';

const ROW_TOP = [
  { Icon: SiGmail,          label: 'Gmail',     color: '#EA4335' },
  { Icon: SiGoogledrive,    label: 'Drive',     color: '#1FA463' },
  { Icon: SiStripe,         label: 'Stripe',    color: '#635BFF' },
  { Icon: SiSlack,          label: 'Slack',     color: '#4A154B' },
  { Icon: SiNotion,         label: 'Notion',    color: '#000000' },
  { Icon: SiGithub,         label: 'GitHub',    color: '#171515' },
  { Icon: SiGooglecalendar, label: 'Calendar',  color: '#4285F4' },
  { Icon: SiGooglesheets,   label: 'Sheets',    color: '#1FA463' },
  { Icon: SiVercel,         label: 'Vercel',    color: '#000000' },
  { Icon: SiPostgresql,     label: 'Postgres',  color: '#336791' },
];

const ROW_BOTTOM = [
  { Icon: SiDiscord,  label: 'Discord',  color: '#5865F2' },
  { Icon: FaAws,      label: 'AWS S3',   color: '#FF9900' },
  { Icon: SiX,        label: 'X',        color: '#000000' },
  { Icon: SiToggl,    label: 'Toggl',    color: '#E57CD8' },
  { Icon: SiAirtable, label: 'Airtable', color: '#FFB400' },
  { Icon: SiTrello,   label: 'Trello',   color: '#0079BF' },
  { Icon: SiZoom,     label: 'Zoom',     color: '#0B5CFF' },
  { Icon: SiDropbox,  label: 'Dropbox',  color: '#0061FF' },
  { Icon: SiLinear,   label: 'Linear',   color: '#5E6AD2' },
  { Icon: SiFigma,    label: 'Figma',    color: '#F24E1E' },
  { Icon: SiAsana,    label: 'Asana',    color: '#F06A6A' },
];

function MarqueeRow({ items, reverse = false }) {
  // duplicate set for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="group relative flex overflow-hidden">
      <div
        className={`flex shrink-0 items-center gap-12 pr-12 will-change-transform ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } group-hover:[animation-play-state:paused]`}
        aria-hidden="false"
      >
        {doubled.map((logo, i) => (
          <span
            key={`${logo.label}-${i}`}
            title={logo.label}
            className="inline-flex items-center gap-3 shrink-0 text-akili-charbon-soft hover:text-[var(--brand)] transition-colors duration-200"
            style={{ '--brand': logo.color }}
          >
            <logo.Icon size={26} className="opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="font-display font-bold text-base tracking-tight whitespace-nowrap">
              {logo.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function IntegrationsMarquee() {
  return (
    <section
      id="integrations"
      className="py-22 bg-akili-papyrus border-y border-akili-line/60 relative overflow-hidden"
    >
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
            Intégrations
          </span>
          <h2 className="font-display font-extrabold text-[32px] sm:text-[40px] leading-[1.1] tracking-[-0.02em] mt-3 text-balance">
            Branche-toi à tout ton stack,
            <span className="block text-akili-coral">en deux clics.</span>
          </h2>
          <p className="font-sans text-base leading-relaxed text-akili-charbon-soft mt-4 max-w-lg mx-auto">
            Nos intégrations officielles couvrent ton quotidien — du paiement à la prod,
            du mail au cal.
          </p>
        </motion.div>
      </Container>

      {/* Marquee container — full bleed pour l'effet rivière */}
      <div className="relative mt-12">
        {/* Masques fade gauche/droite */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 sm:w-48"
          style={{
            background:
              'linear-gradient(to right, rgb(249, 243, 230) 0%, rgba(249, 243, 230, 0) 100%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 sm:w-48"
          style={{
            background:
              'linear-gradient(to left, rgb(249, 243, 230) 0%, rgba(249, 243, 230, 0) 100%)',
          }}
        />

        <div className="flex flex-col gap-8">
          <MarqueeRow items={ROW_TOP} />
          <MarqueeRow items={ROW_BOTTOM} reverse />
        </div>
      </div>

      {/* Footer note */}
      <Container size="xl" className="mt-12">
        <p className="text-center text-xs font-display font-bold uppercase tracking-[0.2em] text-akili-charbon-mute">
          21+ intégrations officielles · Une nouvelle chaque mois
        </p>
      </Container>
    </section>
  );
}

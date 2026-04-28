/**
 * Testimonials — Voix des utilisateurs (placeholder beta).
 * 3 quotes ancrées dans la réalité africaine francophone.
 * À remplacer par de vrais témoignages dès la première semaine post-lancement.
 */
import { motion } from 'framer-motion';
import { Quotes, Star } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';

const QUOTES = [
  {
    body: "Avant Akili, je passais le dimanche soir à préparer mes factures Stripe. Maintenant, je dors. Littéralement.",
    name: 'Aïcha Diallo',
    role: 'Freelance design · Cotonou',
    initials: 'AD',
    flag: '🇧🇯',
    accent: 'or',
  },
  {
    body: "On a remplacé Zapier en deux semaines. Moins cher, en français, et le support répond — pas un bot. C'est ça la différence.",
    name: 'Olusola Adeyemi',
    role: 'CTO · agence digitale, Lagos',
    initials: 'OA',
    flag: '🇳🇬',
    accent: 'coral',
  },
  {
    body: "Le template de backup BDD m'a sauvé la vie le mois dernier. Un dump corrompu en prod, et 5 min plus tard j'avais ma sauvegarde de la nuit. Inestimable.",
    name: 'Mamadou Sow',
    role: 'Lead dev · scale-up fintech, Dakar',
    initials: 'MS',
    flag: '🇸🇳',
    accent: 'indigo',
  },
];

const ACCENTS = {
  or:     { ring: 'ring-akili-or-100',     bg: 'bg-akili-or-50',     text: 'text-akili-or-900',    quote: 'text-akili-or' },
  coral:  { ring: 'ring-akili-coral-100',  bg: 'bg-akili-coral-50',  text: 'text-akili-coral-700', quote: 'text-akili-coral' },
  indigo: { ring: 'ring-akili-indigo-100', bg: 'bg-akili-indigo-50', text: 'text-akili-indigo',    quote: 'text-akili-indigo' },
};

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function Testimonials() {
  return (
    <section id="temoignages" className="py-30 bg-akili-papyrus relative overflow-hidden">
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: '50%', top: 60, width: 540, height: 540, transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(255,107,92,0.07) 0%, rgba(255,107,92,0) 60%)',
        }}
      />

      <Container size="xl" className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral inline-flex items-center gap-2">
            <Star size={14} weight="fill" /> Ils utilisent déjà Akili
          </span>
          <h2 className="font-display font-extrabold text-[44px] sm:text-[52px] leading-[1.05] tracking-[-0.03em] mt-4 text-balance">
            Trois voix, trois villes,
            <span className="block text-akili-coral">une même tranquillité.</span>
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-akili-charbon-soft mt-5">
            Témoignages collectés auprès de nos utilisateurs beta, entre Cotonou, Lagos et Dakar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-16">
          {QUOTES.map((q, i) => {
            const a = ACCENTS[q.accent];
            return (
              <motion.figure
                key={q.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={reveal}
                className="group relative bg-white rounded-akili p-7 lg:p-8 border border-akili-line hover:shadow-akili-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Big quote mark */}
                <Quotes
                  size={36}
                  weight="fill"
                  className={`${a.quote} opacity-30 -ml-1`}
                />

                {/* Stars */}
                <div className="flex gap-0.5 mt-3">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={14} weight="fill" className="text-akili-or" />
                  ))}
                </div>

                {/* Body */}
                <blockquote className="font-display font-bold text-[18px] leading-[1.45] tracking-[-0.01em] text-akili-charbon mt-4 text-balance">
                  « {q.body} »
                </blockquote>

                {/* Author */}
                <figcaption className="mt-auto pt-7 flex items-center gap-3 border-t border-akili-line/60 mt-6">
                  <span
                    className={`shrink-0 w-11 h-11 rounded-full ring-2 ring-inset flex items-center justify-center font-display font-extrabold text-sm ${a.bg} ${a.text} ${a.ring}`}
                  >
                    {q.initials}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-[14px] text-akili-charbon flex items-center gap-1.5">
                      {q.name}
                      <span className="text-base leading-none" aria-hidden>{q.flag}</span>
                    </div>
                    <div className="font-sans text-[12px] text-akili-charbon-mute leading-tight mt-0.5">
                      {q.role}
                    </div>
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center"
        >
          <div className="inline-flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} size={16} weight="fill" className="text-akili-or" />
              ))}
            </div>
            <span className="font-display font-extrabold text-akili-charbon">4.9 / 5</span>
            <span className="font-sans text-sm text-akili-charbon-mute">
              · 120+ avis beta
            </span>
          </div>
          <span className="hidden md:inline-block w-px h-5 bg-akili-line" />
          <span className="font-sans text-sm text-akili-charbon-mute">
            <span className="font-semibold text-akili-charbon">2 800+</span> automatisations actives
          </span>
          <span className="hidden md:inline-block w-px h-5 bg-akili-line" />
          <span className="font-sans text-sm text-akili-charbon-mute">
            Adopté à <span className="font-semibold text-akili-charbon">6 villes</span> en Afrique &amp; Europe
          </span>
        </motion.div>
      </Container>
    </section>
  );
}

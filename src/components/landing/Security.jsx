/**
 * Security — Confiance & sécurité.
 * 4 piliers + bandeau de stats clés. Section sombre Indigo Nuit
 * pour casser le rythme des sections claires précédentes.
 */
import { motion } from 'framer-motion';
import {
  ShieldCheck, LockKey, Globe, Eye,
  CheckCircle, Sparkle as Sparkles,
} from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';

const PILLARS = [
  {
    Icon: LockKey,
    title: 'Chiffrement de bout en bout',
    body: 'TLS 1.3 en transit, AES-256 au repos. Tes credentials d\'intégration sont chiffrés avec une clé dédiée par compte.',
    bullets: ['TLS 1.3', 'AES-256', 'Clés isolées par tenant'],
  },
  {
    Icon: Globe,
    title: 'Hébergement européen',
    body: 'Données stockées à Frankfurt (UE), conformes RGPD. Pas de transfert hors UE sans ton accord explicite.',
    bullets: ['Frankfurt (DE)', 'RGPD-ready', 'Backups quotidiens'],
  },
  {
    Icon: ShieldCheck,
    title: 'OAuth officiel uniquement',
    body: 'On ne te demande jamais ton mot de passe. Toutes les connexions passent par les flows officiels Google, Stripe, Slack, etc.',
    bullets: ['OAuth 2.0', 'Révocation 1-clic', 'Scopes minimaux'],
  },
  {
    Icon: Eye,
    title: 'Audit & transparence',
    body: 'Chaque exécution est tracée pendant 1 an : qui, quoi, quand, résultat. Logs exportables en CSV à tout moment.',
    bullets: ['Logs 1 an', 'Export CSV', 'Traçabilité complète'],
  },
];

const STATS = [
  { value: '99.9 %',  label: "Uptime sur 12 derniers mois" },
  { value: '< 4 h',   label: 'Temps moyen de réponse incident' },
  { value: '0',       label: 'Fuite de données depuis lancement' },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function Security() {
  return (
    <section id="securite" className="py-30 bg-akili-indigo text-akili-papyrus relative overflow-hidden">
      {/* Halos */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: -120, top: 80, width: 480, height: 480,
          background: 'radial-gradient(circle, rgba(242,201,76,0.16) 0%, rgba(242,201,76,0) 60%)',
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: -100, bottom: -80, width: 380, height: 380,
          background: 'radial-gradient(circle, rgba(255,107,92,0.14) 0%, rgba(255,107,92,0) 65%)',
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
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-or inline-flex items-center gap-2">
            <Sparkles size={16} weight="duotone" /> Confiance &amp; sécurité
          </span>
          <h2 className="font-display font-extrabold text-[44px] sm:text-[56px] leading-[1.05] tracking-[-0.03em] mt-4 text-balance">
            Tes données ne dorment{' '}
            <span className="text-akili-or">jamais d'un œil</span>.
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-akili-indigo-100 mt-5 max-w-xl mx-auto">
            On manipule des emails, des factures, des accès. Voilà comment on protège tout ça,
            concrètement.
          </p>
        </motion.div>

        {/* 4 piliers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={reveal}
              className="group p-7 rounded-akili bg-akili-indigo-900 border border-akili-indigo-700 hover:border-akili-or transition-colors duration-300"
            >
              <div className="flex items-start gap-5">
                <span className="shrink-0 w-12 h-12 rounded-akili bg-akili-or-50/10 text-akili-or flex items-center justify-center group-hover:bg-akili-or group-hover:text-akili-indigo transition-all duration-300">
                  <p.Icon size={26} weight="duotone" />
                </span>
                <div className="flex-1">
                  <h3 className="font-display font-extrabold text-[20px] tracking-[-0.02em] text-akili-papyrus">
                    {p.title}
                  </h3>
                  <p className="font-sans text-[14.5px] leading-[1.6] text-akili-indigo-100 mt-2.5">
                    {p.body}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.bullets.map((b) => (
                      <li
                        key={b}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-akili-indigo-700/60 text-[11px] font-display font-bold uppercase tracking-wider text-akili-or-50"
                      >
                        <CheckCircle size={11} weight="fill" className="text-akili-or" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-px rounded-akili overflow-hidden border border-akili-indigo-700 bg-akili-indigo-700"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-akili-indigo-950 px-7 py-8 text-center"
            >
              <div className="font-display font-extrabold text-[40px] leading-none tracking-[-0.03em] text-akili-or">
                {s.value}
              </div>
              <div className="font-sans text-[13px] text-akili-indigo-100 mt-2.5">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center font-sans text-sm text-akili-charbon-mute mt-10"
        >
          Status page publique disponible sur{' '}
          <a href="/status" className="text-akili-or hover:underline font-semibold">
            status.akili.app
          </a>
          {' '}— historique des incidents en clair.
        </motion.p>
      </Container>
    </section>
  );
}

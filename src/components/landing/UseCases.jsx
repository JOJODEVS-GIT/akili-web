import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Receipt, Rocket, TreeStructure as FolderTree } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const CASES = [
  {
    tag: 'Finance',
    accent: 'or',
    Icon: Receipt,
    iconBg: 'bg-akili-or-50',
    iconColor: 'text-akili-or-700',
    stat: '12s',
    statLabel: 'pour 200 factures',
    title: 'Générer 200 factures en 12 secondes',
    body: "Akili lit ta feuille de calcul, génère les PDF, envoie les emails. Tu vérifies, tu signes.",
    glow: 'hover:shadow-akili-or',
  },
  {
    tag: 'DevOps',
    accent: 'coral',
    Icon: Rocket,
    iconBg: 'bg-akili-coral-50',
    iconColor: 'text-akili-coral-700',
    stat: '4 h',
    statLabel: 'gagnées par semaine',
    title: 'Déployer chaque vendredi à 18 h',
    body: "Pull, build, test, ship. Si ça casse, Akili rollback et te ping sur Slack — pas de surprise.",
    glow: 'hover:shadow-akili-coral',
  },
  {
    tag: 'Ops',
    accent: 'indigo',
    Icon: FolderTree,
    iconBg: 'bg-akili-indigo-50',
    iconColor: 'text-akili-indigo',
    stat: '1 000+',
    statLabel: 'fichiers / mois',
    title: 'Trier les uploads automatiquement',
    body: "Drive → renommer → classer par client → notifier. Une règle, mille fichiers.",
    glow: 'hover:shadow-akili-md',
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function UseCases() {
  return (
    <section id="cas-usage" className="py-30 bg-akili-papyrus">
      <Container size="xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
              Cas d'usage
            </span>
            <h2 className="font-display font-extrabold text-[44px] sm:text-[48px] leading-[1.05] tracking-[-0.03em] mt-4 max-w-[600px] text-balance">
              Trois exemples vrais, parmi des milliers.
            </h2>
          </motion.div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            href="#all-cases"
            className="inline-flex items-center gap-1.5 text-akili-coral font-semibold text-sm hover:gap-2.5 transition-all duration-200"
          >
            Tout voir <ArrowRight size={14} />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {CASES.map((c, i) => (
            <motion.div
              key={c.tag}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={reveal}
            >
              <Card
                variant="elevated"
                padding="lg"
                interactive
                className={`${c.glow} group h-full flex flex-col`}
              >
                <div className="flex items-start justify-between mb-5">
                  <Badge variant={c.accent}>{c.tag}</Badge>
                  <div className={`w-11 h-11 rounded-akili ${c.iconBg} flex items-center justify-center ${c.iconColor} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
                    <c.Icon size={20} strokeWidth={1.75} />
                  </div>
                </div>

                {/* Stat highlight */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className={`font-display font-extrabold text-[40px] tracking-[-0.03em] leading-none ${c.iconColor}`}>
                    {c.stat}
                  </span>
                  <span className="text-xs text-akili-charbon-mute font-medium">
                    {c.statLabel}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-xl leading-[1.2] tracking-[-0.02em] mt-1 text-balance">
                  {c.title}
                </h3>
                <p className="font-sans text-[14px] text-akili-charbon-soft mt-3 leading-[1.55]">
                  {c.body}
                </p>

                <div className="mt-auto pt-6 flex items-center gap-1.5 text-akili-indigo font-display font-bold text-sm group-hover:text-akili-coral transition-colors">
                  Lire l'histoire <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

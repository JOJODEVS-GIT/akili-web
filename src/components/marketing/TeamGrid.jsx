/**
 * TeamGrid — Section "L'équipe Akili" pour la page /manifesto.
 *
 * 5 membres avec photos pravatar (à swap avec vraies photos quand prêt),
 * fallback initiales si l'image échoue.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

const TEAM = [
  {
    name: 'Jojo Hounkanrin',
    role: 'Lead Dev & Fondateur',
    city: 'Cotonou 🇧🇯',
    bio: 'Imagine la vision, code la nuit, dort le dimanche.',
    initials: 'JH',
    slug: 'jojo',
  },
  {
    name: 'Olusola Adeyemi',
    role: 'CTO & Architecture',
    city: 'Lagos 🇳🇬',
    bio: 'Design la stack, débugge ce qui crashe, garde le navire à flot.',
    initials: 'OA',
    slug: 'olusola',
  },
  {
    name: 'Aïcha Diallo',
    role: 'Lead Design & UX',
    city: 'Cotonou 🇧🇯',
    bio: 'Trace la charte Nuit & Lumière, écrit les microcopies.',
    initials: 'AD',
    slug: 'aicha',
  },
  {
    name: 'Mamadou Sow',
    role: 'Backend & Data',
    city: 'Dakar 🇸🇳',
    bio: 'Optimise les requêtes, sécurise les RLS, automatise le déploiement.',
    initials: 'MS',
    slug: 'mamadou',
  },
  {
    name: 'Léa Mbeki',
    role: 'Customer & Community',
    city: 'Paris 🇫🇷',
    bio: 'Écoute les utilisateurs, transforme leurs retours en features.',
    initials: 'LM',
    slug: 'lea',
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

function MemberAvatar({ slug, name, initials }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <span className="w-20 h-20 rounded-full bg-akili-indigo text-akili-or flex items-center justify-center font-display font-extrabold text-xl">
        {initials}
      </span>
    );
  }
  return (
    <img
      src={`https://i.pravatar.cc/200?u=akili-team-${slug}`}
      alt={name}
      width={80}
      height={80}
      onError={() => setErrored(true)}
      className="w-20 h-20 rounded-full object-cover ring-4 ring-akili-or/20 bg-akili-papyrus-deep"
    />
  );
}

export function TeamGrid() {
  return (
    <section id="equipe" className="py-22 bg-akili-papyrus">
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
            · L'équipe ·
          </span>
          <h2 className="font-display font-extrabold text-[40px] sm:text-[48px] leading-[1.05] tracking-[-0.03em] mt-4 text-balance">
            Cinq personnes,
            <span className="block text-akili-coral">trois villes africaines.</span>
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-akili-charbon-soft mt-5">
            Pas de fondateur unique. Pas de hand-off entre design et dev. Une équipe
            distribuée qui se parle tous les jours, et qui code en français.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-14">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.slug}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={reveal}
              className="bg-white rounded-akili p-6 border border-akili-line text-center hover:shadow-akili-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex justify-center">
                <MemberAvatar slug={member.slug} name={member.name} initials={member.initials} />
              </div>
              <h3 className="font-display font-extrabold text-base mt-4 tracking-tight text-akili-charbon">
                {member.name}
              </h3>
              <p className="font-display font-bold text-[11px] uppercase tracking-wider text-akili-coral mt-1">
                {member.role}
              </p>
              <p className="font-sans text-[12px] text-akili-charbon-mute mt-1">
                {member.city}
              </p>
              <p className="font-sans text-[13px] text-akili-charbon-soft mt-3 leading-[1.5]">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="text-center font-sans text-sm text-akili-charbon-mute mt-12 italic">
          *Photos via pravatar.cc, à remplacer par les vraies dès qu'on les a tournées.
        </p>
      </Container>
    </section>
  );
}

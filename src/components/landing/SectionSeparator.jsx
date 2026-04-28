/**
 * SectionSeparator — Signature visuelle entre sections.
 * Trois blocs (corail · or · indigo) qui montent en cascade au scroll —
 * métaphore de "la sagesse qui se lève".
 *
 * L'animation joue UNE SEULE FOIS à l'entrée dans le viewport puis se
 * stabilise. Avant on bouclait à l'infini (repeat: Infinity), ce qui
 * créait une vibration permanente perçue par l'utilisateur quand
 * plusieurs séparateurs étaient visibles en même temps.
 */
import { motion } from 'framer-motion';

export function SectionSeparator({ onDark = false }) {
  const colors = ['bg-akili-coral', 'bg-akili-or', onDark ? 'bg-akili-papyrus' : 'bg-akili-indigo'];

  return (
    <div className="flex justify-center py-8" aria-hidden>
      <div className="flex items-end gap-1">
        {colors.map((c, i) => (
          <motion.span
            key={i}
            initial={{ height: 4, opacity: 0.5 }}
            whileInView={{ height: [4, 24, 12], opacity: [0.5, 1, 0.85] }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 1.4,
              delay: i * 0.15,
              ease: [0.25, 0.1, 0.25, 1],
              times: [0, 0.6, 1],
            }}
            className={`w-1 rounded-sm ${c}`}
            style={{ height: 4 }}
          />
        ))}
      </div>
    </div>
  );
}

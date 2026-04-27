/**
 * SectionSeparator — Signature visuelle entre sections.
 * Trois blocs (corail · or · indigo) qui montent en cascade au scroll —
 * métaphore de "la sagesse qui se lève".
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
            whileInView={{ height: [4, 24, 4], opacity: [0.5, 1, 0.5] }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{
              duration: 1.6,
              delay: i * 0.15,
              ease: [0.25, 0.1, 0.25, 1],
              repeat: Infinity,
              repeatType: 'loop',
              repeatDelay: 4,
            }}
            className={`w-1 rounded-sm ${c}`}
            style={{ height: 4 }}
          />
        ))}
      </div>
    </div>
  );
}

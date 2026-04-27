import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function CTA() {
  return (
    <section className="pt-26 pb-32 bg-akili-indigo text-akili-papyrus relative overflow-hidden">
      {/* Halos décoratifs */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: -120, top: -120, width: 380, height: 380,
          background: 'radial-gradient(circle, rgba(242,201,76,0.18) 0%, rgba(242,201,76,0) 60%)',
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: -120, bottom: -120, width: 380, height: 380,
          background: 'radial-gradient(circle, rgba(255,107,92,0.18) 0%, rgba(255,107,92,0) 60%)',
        }}
      />

      <Container size="md" className="text-center relative">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display font-bold text-xs tracking-[0.24em] uppercase text-akili-or"
        >
          · Plus de 2 800 personnes ont déjà sauté le pas ·
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-extrabold text-[44px] sm:text-[56px] leading-[1.05] tracking-[-0.03em] mt-5 text-akili-papyrus text-balance"
        >
          Reprends tes <span className="text-akili-or">heures</span>.
          <br />
          Akili tient le reste.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 inline-flex flex-wrap gap-3 justify-center"
        >
          <Link to="/signup">
            <Button size="lg" variant="primary">Créer mon compte</Button>
          </Link>
          <Link to="/login">
            <Button
              size="lg"
              variant="outline"
              className="border-akili-papyrus/30 text-akili-papyrus hover:bg-akili-papyrus/10 hover:border-akili-papyrus/60"
            >
              J'ai déjà un compte
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-[13px] text-akili-charbon-mute"
        >
          Pas de carte bancaire · Pas de démo commerciale · Tu peux partir à tout moment.
        </motion.p>
      </Container>
    </section>
  );
}

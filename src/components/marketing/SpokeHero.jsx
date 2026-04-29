/**
 * SpokeHero — hero réutilisable pour toutes les pages spokes.
 *
 * Pattern volé à Activepieces : eyebrow petit + H1 large + sub long
 * + CTA primaire + visuel optionnel à droite ou en dessous.
 *
 * Props :
 *  - eyebrow      : texte court "· EYEBROW ·" (uppercase)
 *  - title        : H1 (peut contenir <span> pour mot accent)
 *  - subtitle     : paragraphe descriptif sous le H1
 *  - cta          : { label, href } pour le bouton primaire
 *  - secondaryCta : optionnel { label, href } pour bouton secondaire
 *  - children     : visuel à droite (mockup, image, illustration)
 *  - dark         : true pour fond Indigo Nuit (sinon Papyrus)
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

export function SpokeHero({
  eyebrow,
  title,
  subtitle,
  cta,
  secondaryCta,
  children,
  dark = false,
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden pt-24 pb-26 lg:pt-30',
        dark ? 'bg-akili-indigo text-akili-papyrus' : 'bg-akili-papyrus text-akili-charbon'
      )}
    >
      {/* Halos signature */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: -100,
          top: 60,
          width: 480,
          height: 480,
          background: dark
            ? 'radial-gradient(circle, rgba(242,201,76,0.28) 0%, rgba(242,201,76,0) 60%)'
            : 'radial-gradient(circle, rgba(242,201,76,0.12) 0%, rgba(242,201,76,0) 60%)',
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: -80,
          bottom: -60,
          width: 360,
          height: 360,
          background: dark
            ? 'radial-gradient(circle, rgba(255,107,92,0.20) 0%, rgba(255,107,92,0) 65%)'
            : 'radial-gradient(circle, rgba(255,107,92,0.08) 0%, rgba(255,107,92,0) 65%)',
        }}
      />

      <Container size="xl" className="relative">
        <div
          className={cn(
            'grid grid-cols-1 gap-12 items-center',
            children ? 'lg:grid-cols-[1.1fr_1fr]' : ''
          )}
        >
          {/* Texte */}
          <div>
            {eyebrow && (
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className={cn(
                  'font-display font-bold text-xs tracking-[0.18em] uppercase',
                  dark ? 'text-akili-or' : 'text-akili-coral'
                )}
              >
                {eyebrow}
              </motion.span>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={cn(
                'font-display font-extrabold mt-5 max-w-[800px] text-balance leading-[1.02] tracking-[-0.04em]',
                dark ? 'text-akili-papyrus' : 'text-akili-charbon'
              )}
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className={cn(
                  'font-sans text-lg leading-relaxed mt-6 max-w-[560px]',
                  dark ? 'text-akili-indigo-100' : 'text-akili-charbon-soft'
                )}
              >
                {subtitle}
              </motion.p>
            )}

            {cta && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-wrap gap-3.5 mt-9"
              >
                <Link to={cta.href} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="primary"
                    shape="pill"
                    iconRight={<ArrowRight size={18} />}
                    className="w-full sm:w-[210px] justify-center whitespace-nowrap"
                  >
                    {cta.label}
                  </Button>
                </Link>
                {secondaryCta && (
                  <Link to={secondaryCta.href} className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      shape="pill"
                      className={cn(
                        'w-full sm:w-[210px] justify-center whitespace-nowrap',
                        dark && 'border-akili-papyrus/30 text-akili-papyrus hover:bg-akili-papyrus/10'
                      )}
                    >
                      {secondaryCta.label}
                    </Button>
                  </Link>
                )}
              </motion.div>
            )}
          </div>

          {/* Visuel optionnel à droite */}
          {children && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}

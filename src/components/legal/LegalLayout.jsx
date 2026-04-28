/**
 * LegalLayout — shell partagé pour pages légales et statiques.
 * Header simple (logo + back), contenu prose, footer minimal.
 */
import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';

export function LegalLayout({ eyebrow, title, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-akili-papyrus">
      <header className="border-b border-akili-line bg-akili-papyrus/85 backdrop-blur sticky top-0 z-30">
        <Container size="xl" className="h-16 flex items-center justify-between">
          <Link to="/" className="cursor-pointer">
            <Logo size="md" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-akili-charbon-soft hover:text-akili-coral transition-colors"
          >
            <ArrowLeft size={14} /> Retour à l'accueil
          </Link>
        </Container>
      </header>

      <main>
        <Container size="md" className="py-16 lg:py-24">
          {/* Header */}
          <div className="mb-10 lg:mb-14">
            {eyebrow && (
              <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
                {eyebrow}
              </span>
            )}
            <h1 className="font-display font-extrabold text-[40px] sm:text-[56px] tracking-[-0.03em] leading-[1.05] mt-3 text-balance">
              {title}
            </h1>
            {lastUpdated && (
              <p className="font-mono text-xs text-akili-charbon-mute mt-4">
                Dernière mise à jour : {lastUpdated}
              </p>
            )}
          </div>

          {/* Prose content */}
          <article className="prose-akili">
            {children}
          </article>
        </Container>
      </main>

      <footer className="border-t border-akili-line py-8 mt-12">
        <Container size="xl">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-akili-charbon-mute">
            <span>© 2026 Akili. Cotonou · Lagos · Paris.</span>
            <div className="flex gap-6">
              <Link to="/legal/terms"   className="hover:text-akili-coral transition-colors">Conditions</Link>
              <Link to="/legal/privacy" className="hover:text-akili-coral transition-colors">Confidentialité</Link>
              <Link to="/legal/cookies" className="hover:text-akili-coral transition-colors">Cookies</Link>
              <Link to="/legal/notice"  className="hover:text-akili-coral transition-colors">Mentions légales</Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

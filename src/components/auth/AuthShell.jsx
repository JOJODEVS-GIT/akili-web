/**
 * AuthShell — Shell deux colonnes pour Signup / Login.
 * Gauche : formulaire (papyrus). Droite : panneau poétique indigo avec quote.
 */
import { Logo } from '@/components/ui/Logo';
import { Testimonials } from './Testimonials';

export function AuthShell({ children, footer }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-akili-papyrus">
      {/* Left — formulaire */}
      <div className="flex flex-col p-8 sm:p-10 lg:p-14">
        <Logo size="md" />
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="w-full max-w-[400px]">{children}</div>
        </div>
        {footer && (
          <div className="font-sans text-[13px] text-akili-charbon-mute">{footer}</div>
        )}
      </div>

      {/* Right — panneau indigo poétique */}
      <div
        className="relative overflow-hidden hidden lg:flex flex-col justify-between bg-akili-indigo text-akili-papyrus p-14"
      >
        {/* Halos décoratifs */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            right: -120,
            top: -120,
            width: 380,
            height: 380,
            background: 'radial-gradient(circle, rgba(242,201,76,0.15) 0%, rgba(242,201,76,0) 70%)',
          }}
        />
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            left: -80,
            bottom: -80,
            width: 280,
            height: 280,
            background: 'radial-gradient(circle, rgba(255,107,92,0.18) 0%, rgba(255,107,92,0) 70%)',
          }}
        />

        <span className="relative font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-or">
          · Nuit &amp; Lumière ·
        </span>

        <div className="relative">
          <Testimonials />
        </div>

        <div className="relative flex gap-6 font-sans text-[13px] text-akili-charbon-mute">
          <span>© 2026 Akili</span>
          <span>Cotonou · Lagos · Paris</span>
        </div>
      </div>
    </div>
  );
}

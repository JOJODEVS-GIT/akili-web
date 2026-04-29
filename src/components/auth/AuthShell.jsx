/**
 * AuthShell — Shell deux colonnes pour Signup / Login / Reset.
 * Gauche : formulaire (papyrus). Droite : panneau poétique indigo enrichi
 * avec mini chips d'intégrations supportées + carousel témoignages +
 * trust stats en bas.
 */
import { Link } from 'react-router-dom';
import { ArrowLeft } from '@phosphor-icons/react';
import {
  SiGmail, SiGoogledrive, SiStripe, SiSlack, SiNotion, SiGithub,
} from 'react-icons/si';
import { Logo } from '@/components/ui/Logo';
import { Testimonials } from './Testimonials';

const TRUST_INTEGRATIONS = [
  { Icon: SiGmail,       color: '#EA4335' },
  { Icon: SiGoogledrive, color: '#1FA463' },
  { Icon: SiStripe,      color: '#635BFF' },
  { Icon: SiSlack,       color: '#4A154B' },
  { Icon: SiNotion,      color: '#FFFFFF' },
  { Icon: SiGithub,      color: '#FFFFFF' },
];

const TRUST_STATS = [
  { value: '2 800+',  label: 'automatisations' },
  { value: '6',       label: 'villes en Afrique' },
  { value: '< 4 h',   label: 'support FR' },
];

export function AuthShell({ children, footer }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-akili-papyrus">
      {/* Left — formulaire */}
      <div className="flex flex-col p-8 sm:p-10 lg:p-14">
        <div className="flex items-center justify-between gap-4">
          <Logo size="md" />
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-akili-charbon-soft bg-white ring-1 ring-akili-line hover:bg-akili-papyrus-deep hover:text-akili-charbon transition-all"
          >
            <ArrowLeft size={14} weight="bold" />
            Retour
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="w-full max-w-[400px]">{children}</div>
        </div>
        {footer && (
          <div className="font-sans text-[13px] text-akili-charbon-mute">{footer}</div>
        )}
      </div>

      {/* Right — panneau indigo enrichi */}
      <div className="relative overflow-hidden hidden lg:flex flex-col justify-between bg-akili-indigo text-akili-papyrus p-14">
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

        {/* Top : eyebrow + chips intégrations */}
        <div className="relative">
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-or">
            · Nuit &amp; Lumière ·
          </span>

          <div className="mt-8 flex items-center gap-3">
            <span className="font-display font-bold text-[10px] uppercase tracking-[0.15em] text-akili-charbon-mute whitespace-nowrap">
              21 outils branchés
            </span>
            <div className="h-px flex-1 bg-akili-indigo-700" />
          </div>
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            {TRUST_INTEGRATIONS.map(({ Icon, color }, i) => (
              <span
                key={i}
                className="w-9 h-9 rounded-full bg-akili-indigo-700/60 border border-akili-indigo-700 flex items-center justify-center hover:scale-110 transition-transform duration-200"
                style={{ color }}
              >
                <Icon size={15} />
              </span>
            ))}
            <span className="ml-1 font-display font-bold text-[11px] text-akili-charbon-mute">
              + 15 autres
            </span>
          </div>
        </div>

        {/* Centre : carousel témoignages */}
        <div className="relative">
          <Testimonials />
        </div>

        {/* Bottom : trust stats strip */}
        <div className="relative">
          <div className="grid grid-cols-3 gap-4 pb-6 border-b border-akili-indigo-700">
            {TRUST_STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display font-extrabold text-2xl text-akili-or tracking-[-0.02em] leading-none">
                  {s.value}
                </div>
                <div className="font-sans text-[11px] text-akili-charbon-mute mt-1.5 leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-6 font-sans text-[13px] text-akili-charbon-mute">
            <span>© 2026 Akili</span>
            <span>Cotonou · Lagos · Paris</span>
          </div>
        </div>
      </div>
    </div>
  );
}

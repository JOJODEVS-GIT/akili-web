/**
 * GoogleButton — bouton OAuth Google
 * Style propre avec icône SVG officielle Google.
 */
export function GoogleButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-11 w-full inline-flex items-center justify-center gap-2.5 bg-white border border-akili-line rounded-akili font-sans text-sm font-medium text-akili-charbon cursor-pointer transition-all duration-200 ease-akili hover:bg-akili-papyrus-warm"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
        <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.61z"/>
        <path fill="#34A853" d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.92-2.26c-.8.54-1.83.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.32A9 9 0 0 0 9 18z"/>
        <path fill="#FBBC05" d="M3.97 10.71A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.04l3.01-2.33z"/>
        <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96L3.97 7.3C4.68 5.18 6.66 3.58 9 3.58z"/>
      </svg>
      Continuer avec Google
    </button>
  );
}

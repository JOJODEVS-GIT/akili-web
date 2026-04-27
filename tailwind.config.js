/**
 * Tailwind config — Akili Design System "Nuit & Lumière"
 * Source : claude.ai/design export + tokens du codebase source
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        akili: {
          // ━━━ Palette signature ━━━
          indigo:  '#0E1A3E',
          or:      '#F2C94C',
          coral:   '#FF6B5C',
          papyrus: '#F9F3E6',
          charbon: '#1A1A1A',

          // ━━━ Neutres chauds ━━━
          'charbon-soft': '#4B4640',
          'charbon-mute': '#8A8580',
          line:           '#E8E1D0',
          'papyrus-warm': '#FCF8EE',
          'papyrus-deep': '#F1E8D2',

          // ━━━ Variations Indigo ━━━
          'indigo-50':  '#E8EAF2',
          'indigo-100': '#C8CDDC',
          'indigo-400': '#4B5677',
          'indigo-700': '#1F2D52',
          'indigo-950': '#060D24',

          // ━━━ Variations Or ━━━
          'or-50':  '#FCF6E0',
          'or-100': '#F9EBA8',
          'or-300': '#F7DD7A',
          'or-700': '#C9A33D',
          'or-900': '#857906',

          // ━━━ Variations Corail ━━━
          'coral-50':  '#FFF1EE',
          'coral-100': '#FFD8D2',
          'coral-300': '#FF9388',
          'coral-700': '#D4493B',
          'coral-900': '#8E2D24',

          // ━━━ Couleurs fonctionnelles ━━━
          success: '#4CAF7E',
          warning: '#E89A3D',
          error:   '#C73E33',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Cabinet Grotesk"', 'Inter', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'SF Mono', 'monospace'],
      },
      borderRadius: {
        akili: '8px',
        pill:  '999px',
      },
      boxShadow: {
        'akili-xs': '0 1px 2px rgba(14, 26, 62, 0.06)',
        'akili-sm': '0 2px 8px rgba(14, 26, 62, 0.08)',
        'akili-md': '0 8px 24px rgba(14, 26, 62, 0.10)',
        'akili-lg': '0 16px 48px rgba(14, 26, 62, 0.14)',
        'akili-xl': '0 32px 64px rgba(14, 26, 62, 0.18)',
        'akili-or':    '0 8px 32px rgba(242, 201, 76, 0.35)',
        'akili-coral': '0 8px 32px rgba(255, 107, 92, 0.35)',
      },
      spacing: {
        '18': '72px',
        '22': '88px',
        '26': '104px',
        '30': '120px',
      },
      transitionTimingFunction: {
        akili: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      keyframes: {
        'fade-in':   { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'slide-up':  { '0%': { opacity: 0, transform: 'translateY(16px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'slide-down':{ '0%': { opacity: 0, transform: 'translateY(-16px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'scale-in':  { '0%': { opacity: 0, transform: 'scale(0.96)' }, '100%': { opacity: 1, transform: 'scale(1)' } },
      },
      animation: {
        'fade-in':   'fade-in 250ms cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-up':  'slide-up 400ms cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-down':'slide-down 400ms cubic-bezier(0.25, 0.1, 0.25, 1)',
        'scale-in':  'scale-in 250ms cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [],
};

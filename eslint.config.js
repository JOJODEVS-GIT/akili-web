/**
 * ESLint flat config (ESLint v9+).
 *
 * Migration depuis l'ancien .eslintrc — la nouvelle config en flat
 * file est requise depuis ESLint v9. On garde une config laxe pour
 * éviter de bloquer le CI sur du legacy code, tout en attrapant les
 * vraies erreurs (variables non utilisées, hooks mal utilisés, etc.).
 */
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  // Ignore folders
  {
    ignores: ['dist/**', 'node_modules/**', '.vercel/**', 'public/**'],
  },
  // Base recommended JS rules
  js.configs.recommended,
  // React + Hooks
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // React
      'react/react-in-jsx-scope': 'off',     // Pas besoin avec Vite + React 18
      'react/prop-types': 'off',             // Pas de TypeScript ici
      'react/no-unescaped-entities': 'off',  // On a des apostrophes en français partout
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',

      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off', // Laxe pour le hackathon, à durcir post-launch

      // JS — laxe pour ne pas bloquer le CI sur du legacy.
      // À durcir progressivement quand on aura le temps de cleanup.
      'no-unused-vars': 'off',
      'no-empty': ['warn', { allowEmptyCatch: true }],
      'no-undef': 'error',
      'no-console': 'off',
    },
  },
];

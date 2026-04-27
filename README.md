# Akili Web

> **La sagesse qui se lève, en un seul clic.**
> Application web Akili — landing page, auth complète, dashboard avec 5 pages.
> Hackathon EIG × Akili · Cotonou.

![Tech](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwindcss&logoColor=white)
![Framer](https://img.shields.io/badge/Framer-Motion-0055FF?logo=framer&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)

---

## 🚀 Démarrage rapide

```bash
git clone <repo-url>
cd akili-web
npm install
cp .env.example .env.local       # remplir si Supabase activé
npm run dev
```

L'app tourne sur `http://localhost:5173`.

### Build production
```bash
npm run build
npm run preview
```

---

## 📦 Stack

| Couche      | Choix                                |
|-------------|--------------------------------------|
| Build       | Vite 5                               |
| UI          | React 18                             |
| Routing     | React Router v6 (lazy-loaded)        |
| Styling     | Tailwind CSS 3 — charte Nuit & Lumière |
| Animations  | Framer Motion 11                     |
| Icônes      | lucide-react                         |
| Auth + BDD  | Supabase (mock par défaut)           |
| Hosting     | Vercel                               |

---

## 🗺️ Pages

### Public
- `/` — Landing
- `/about` · `/contact` · `/status` · `/changelog`
- `/legal/terms` · `/legal/privacy` · `/legal/cookies` · `/legal/notice`

### Auth
- `/login` · `/signup` · `/forgot-password`

### App (protégée)
- `/app` — Tableau de bord
- `/app/automations` — Marketplace + mes automations
- `/app/runs` — Heatmap + historique + live feed
- `/app/connections` — 12 intégrations OAuth
- `/app/docs` — Documentation
- `/app/profile` · `/app/settings`

---

## 🎨 Charte « Nuit & Lumière »

| Token              | Hex       | Usage                           |
|--------------------|-----------|---------------------------------|
| `akili-indigo`     | `#0E1A3E` | Hero sombres, autorité          |
| `akili-or`         | `#F2C94C` | Highlights, badges premium      |
| `akili-coral`      | `#FF6B5C` | CTA principaux (1 par écran)    |
| `akili-papyrus`    | `#F9F3E6` | Fond global (pas blanc)         |
| `akili-charbon`    | `#1A1A1A` | Texte (pas noir)                |

**Règle 60-30-10** : 60% papyrus · 30% indigo/charbon · 10% corail/or.

Polices : **Cabinet Grotesk** (display) + **Inter** (body).

---

## 🏗️ Workflow équipe

```
main  ← Production (Vercel auto-deploy)
 │
 └── dev  ← Intégration stable
       ├── feat/xxx       ← features
       ├── fix/xxx        ← bug fixes
       └── chore/xxx      ← refactoring, deps
```

### Règles
- **1 fonctionnalité = 1 branche = 1 PR**
- **Aucun commit direct sur `main` ou `dev`**
- **Review obligatoire** avant merge sur `dev`
- **Daily sync** court pour identifier les blocages

### Convention de commits
```
feat:     ajout d'une fonctionnalité
fix:      correction de bug
style:    ajustement visuel
docs:     documentation
refactor: refactoring sans changement fonctionnel
chore:    maintenance (deps, config)
```

### Créer une branche
```bash
git checkout dev
git pull origin dev
git checkout -b feat/ma-feature
# ... commits ...
git push -u origin feat/ma-feature
# Ouvrir la PR sur GitHub vers `dev`
```

---

## 🚢 Déploiement Vercel

1. Connecter le repo GitHub à Vercel
2. Framework preset : **Vite** (auto-détecté)
3. Variables d'environnement (si Supabase) :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Push sur `main` → déploiement production automatique
5. Push sur n'importe quelle branche → preview URL

---

## 📜 Conventions code
- **Pas de valeurs magiques** — tout via tokens Tailwind
- **Composants à responsabilité unique**
- **Erreurs humaines** : « Cet email ne semble pas connu » (pas `401 Unauthorized`)
- **Tutoiement, sentence case, pas d'emoji** dans le chrome de l'app
- **Animations exclusivement Framer Motion**
- **WCAG AA** : focus rings visibles, navigation clavier, contrastes ≥ 4.5:1

---

## 🤝 Crédits

Hackathon **EIG × Akili** · Cotonou.
Design system généré sur **claude.ai/design**.
Implémentation par l'équipe Dev.

> **Akili — Nuit & Lumière. La sagesse qui se lève.**

# Contribuer à Akili

Merci de t'investir sur Akili. Ce guide t'aide à contribuer proprement.

---

## 🌳 Branches — règle d'or

```
main  ← Production (Vercel auto-deploy) — INTOUCHABLE direct
 │
 └── dev  ← Intégration stable — INTOUCHABLE direct
       ├── feat/<nom>      ← nouvelles features
       ├── fix/<nom>       ← bug fixes
       └── chore/<nom>     ← refactoring, dépendances
```

**JAMAIS** `git push origin main` ni `git push origin dev` directement.

---

## 🚀 Workflow standard

### 1. Avant de commencer
```bash
git checkout dev
git pull origin dev
```

### 2. Créer une branche
```bash
git checkout -b feat/nom-explicite
```

Naming conventions :
- `feat/login-google-oauth`
- `fix/dashboard-mobile-overflow`
- `chore/upgrade-react-19`

### 3. Coder et committer
Convention de commits :
```
feat:     ajout d'une fonctionnalité
fix:      correction de bug
style:    ajustement visuel
docs:     documentation
refactor: refactoring sans changement fonctionnel
chore:    maintenance (deps, config)
```

Exemple :
```bash
git commit -m "feat: ajout du toggle dark mode dans Settings"
```

### 4. Pousser et ouvrir une PR
```bash
git push -u origin feat/nom-explicite
gh pr create --base dev --fill
```

Ou depuis l'UI GitHub : tu verras un bouton "Compare & pull request" après le push.

### 5. Attendre la review
- Le Lead (ou un teammate) lit le code
- Il peut demander des changements (commentaires) ou approuver
- Une fois approuvée, **merge en squash** sur `dev`

### 6. Après merge
```bash
git checkout dev
git pull origin dev
git branch -D feat/nom-explicite   # supprimer la branche locale
```

---

## ✅ Checklist avant d'ouvrir une PR

- [ ] `npm run build` passe sans erreur
- [ ] Pas de `console.log` oublié
- [ ] Pas de valeur en dur (couleurs, tailles, espacements) — utiliser les tokens Tailwind
- [ ] Testé sur **mobile (375px)** ET **desktop (1440px)**
- [ ] États gérés : loading, error, success, hover, focus, disabled
- [ ] Description claire de la PR (utilise le template)
- [ ] Pas de `.env.local` commité

---

## 🎨 Conventions de code

### Tokens Tailwind (jamais de magie)
```jsx
// ✅ BIEN
<button className="bg-akili-coral text-white rounded-akili">

// ❌ MAL
<button style={{ background: '#FF6B5C', borderRadius: '8px' }}>
```

### Composants
- Un composant = un fichier
- PascalCase pour les fichiers : `Button.jsx`
- Hooks en `useXxx.js`
- Pas de god-components > 200 lignes

### Animations
- Toujours **Framer Motion**, jamais d'animation CSS bricolée
- Easing signature : `[0.25, 0.1, 0.25, 1]`
- Durées : 150ms (micro), 250ms (standard), 400ms (entrée)

### Erreurs humaines
```jsx
// ✅ BIEN
"Cet email ne semble pas connu."

// ❌ MAL
"401 Unauthorized"
```

---

## 🛡️ Règles de sécurité

- **JAMAIS** committer `.env.local` (il est dans `.gitignore`)
- **JAMAIS** commiter de clé API en dur
- Pour les secrets, utiliser `import.meta.env.VITE_*`
- Webhook URLs et tokens : variables d'env uniquement

---

## 🐛 Reporter un bug

Ouvre une issue avec :
1. **Description** : ce qui se passe vs ce qui devrait se passer
2. **Étapes** pour reproduire
3. **Capture** d'écran si visuel
4. **Environnement** : OS, navigateur, version

---

## 💡 Proposer une feature

Ouvre une issue avec le label `feature request` :
1. **Problème** que ça résout
2. **Solution** proposée
3. **Alternatives** considérées

Discussion avant code.

---

## 🤝 Code review

Quand tu reviewes la PR de quelqu'un :
- Sois **bienveillant** mais **honnête**
- Suggère plutôt qu'imposer (utilise les "suggestions" GitHub)
- Concentre-toi sur la **logique** et la **maintenabilité**, pas le style perso
- Si bloqué : Request changes avec explication claire

Quand tu reçois une review :
- Lis tout, ne réponds pas à chaud
- Implémente les suggestions ou explique pourquoi pas
- Re-demande review après corrections

---

## 📞 Contact

Question ? Ouvre une issue ou contacte le Lead du projet directement.

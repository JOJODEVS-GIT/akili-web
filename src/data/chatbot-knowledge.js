/**
 * chatbot-knowledge.js — Base de connaissances scriptée du bot Akili.
 *
 * Le bot ne fait pas d'IA, il répond à un set fini de questions courantes
 * via des quick-replies. Si le user veut plus, on l'envoie sur mailto.
 */

export const TEAM = [
  { name: 'Yannick',    role: 'Support',          slug: 'team-yannick' },
  { name: 'Marie-Aude', role: 'Customer success', slug: 'team-marieaude' },
  { name: 'Olivier',    role: 'Tech',             slug: 'team-olivier' },
];

const SUPPORT_EMAIL = 'hello@akili.app';

// Message d'accueil envoyé par le bot dès l'ouverture du chat
export const GREETING = {
  body: "👋 Salut ! On est l'équipe Akili.\n\nLes questions courantes ont une réponse 24/7 ici. Si tu veux parler à un humain, on est là sous 4 h aux heures Afrique de l'Ouest.\n\nComment je peux t'aider ?",
  quickReplies: ['pricing', 'integrations', 'security', 'getting_started', 'human'],
};

// Knowledge base — chaque clé = une intention
export const KNOWLEDGE = {
  pricing: {
    label: '💰 Vos tarifs',
    answer: "On a 3 plans simples :\n\n• **Atelier** — gratuit (5 automatisations, 500 runs/mois)\n• **Pro** — 12 €/mois (illimité, le plus populaire) 🔥\n• **Team** — 39 €/mois (jusqu'à 10 users, SSO)\n\nTous les plans payants ont 14 jours d'essai gratuit, sans CB.",
    followups: ['integrations', 'getting_started', 'menu', 'human'],
  },
  integrations: {
    label: '🔌 Intégrations',
    answer: "On a 21+ intégrations officielles : Gmail, Drive, Sheets, Calendar, Stripe, Slack, Discord, Notion, GitHub, Vercel, Postgres, AWS S3, Twitter, Toggl, Airtable, Trello, Zoom, Dropbox, Linear, Figma, Asana.\n\nUne nouvelle intégration arrive chaque mois. Wave, Orange Money et MTN MoMo sont prévues pour Q3 2026 🌍",
    followups: ['pricing', 'getting_started', 'menu', 'human'],
  },
  security: {
    label: '🛡️ Sécurité',
    answer: "On prend ça très au sérieux :\n\n• **Chiffrement AES-256** au repos, **TLS 1.3** en transit\n• **Hébergement en Europe** (Frankfurt) — RGPD-ready\n• **OAuth officiel** uniquement — on ne stocke jamais ton mot de passe\n• **Audit log** complet, exportable en CSV\n• **99.9 % uptime** sur les 12 derniers mois\n\nStatus page publique : status.akili.app",
    followups: ['pricing', 'menu', 'human'],
  },
  getting_started: {
    label: '🚀 Comment commencer',
    answer: "C'est rapide, promis :\n\n1. Créer ton compte (30 s, sans CB)\n2. Connecter tes outils via OAuth (2 clics)\n3. Choisir un template prêt à l'emploi (ou créer la tienne en français)\n4. Lancer\n\nLa première automatisation tourne en moyenne en 60 secondes.",
    followups: ['pricing', 'integrations', 'menu', 'human'],
  },
  human: {
    label: '👤 Parler à un humain',
    answer: `Pas de problème. On répond à \`${SUPPORT_EMAIL}\` sous 4 h aux heures Afrique de l'Ouest (UTC+0/+1).\n\nClique le bouton ci-dessous pour ouvrir ta messagerie pré-remplie.`,
    cta: { label: '✉️  Écrire à l\'équipe Akili', href: `mailto:${SUPPORT_EMAIL}?subject=Question%20Akili&body=Salut%20l'%C3%A9quipe%20%E2%80%94%20j'aurais%20une%20question%20:%0A%0A` },
    followups: ['menu'],
  },
  menu: {
    label: '🔙 Retour au menu',
    answer: "Pas de souci, je t'écoute. Que veux-tu savoir ?",
    quickReplies: ['pricing', 'integrations', 'security', 'getting_started', 'human'],
  },
};

// Réponse fallback si le user tape du texte libre (pas de NLP)
export const FALLBACK = {
  body: "Hmm je ne sais pas répondre à ça précisément 😅\n\nUtilise les boutons ci-dessous, ou écris-nous directement par email — un humain te répondra sous 4 h.",
  quickReplies: ['pricing', 'integrations', 'security', 'getting_started', 'human'],
};

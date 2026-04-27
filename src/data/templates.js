/**
 * templates.js — bibliothèque d'automatisations pré-faites Akili.
 * 20 templates simples, accessibles, à brancher en quelques clics.
 *
 * Chaque template est utilisable par :
 * - La page Automatisations (marketplace)
 * - La modal "Nouvelle automatisation"
 * - Les démos du Dashboard
 */
import {
  FileText, FileImage, FolderArchive, Image, FileDigit,
  Mail, Inbox, MailCheck,
  Receipt, FileSpreadsheet, AlertCircle,
  Calendar, CalendarClock, Timer,
  MessageCircle, Bell, Twitter,
  Rocket, ShieldCheck, DatabaseBackup,
} from 'lucide-react';

export const CATEGORIES = {
  files:         { id: 'files',         label: 'Fichiers',     color: 'indigo' },
  email:         { id: 'email',         label: 'Email',        color: 'coral'  },
  invoicing:     { id: 'invoicing',     label: 'Facturation',  color: 'or'     },
  calendar:      { id: 'calendar',      label: 'Agenda',       color: 'indigo' },
  communication: { id: 'communication', label: 'Communication',color: 'coral'  },
  devops:        { id: 'devops',        label: 'DevOps',       color: 'or'     },
};

export const TEMPLATES = [
  // 📁 Fichiers
  { id: 't01', Icon: FolderArchive, category: 'files',         name: 'Renommer fichiers Drive en masse',           desc: 'Pattern : {date}_{client}_{type}.pdf',                       integrations: ['drive'],                  savings: '2 h/sem',  level: 'simple' },
  { id: 't02', Icon: Mail,          category: 'files',         name: 'Sauvegarder pièces jointes Gmail',           desc: 'Tri automatique par expéditeur dans Drive',                  integrations: ['gmail', 'drive'],         savings: '1 h/sem',  level: 'simple' },
  { id: 't03', Icon: FileImage,     category: 'files',         name: 'Convertir images en PDF mensuel',            desc: 'Tous les 1ers du mois, génère un PDF récap',                 integrations: ['drive'],                  savings: '30 min/mois', level: 'simple' },
  { id: 't04', Icon: Image,         category: 'files',         name: 'Compresser images > 1 Mo',                   desc: 'Watch un dossier, optimise sans perte visible',              integrations: ['drive'],                  savings: '1 h/sem',  level: 'simple' },
  { id: 't05', Icon: FileDigit,     category: 'files',         name: 'Backup hebdo Notion → Drive',                desc: 'Export markdown chaque dimanche soir',                       integrations: ['notion', 'drive'],        savings: '30 min/sem', level: 'simple' },

  // ✉️ Email
  { id: 't06', Icon: MailCheck,     category: 'email',         name: 'Réponse "vacances" automatique',             desc: 'Active entre deux dates, avec message custom',               integrations: ['gmail'],                  savings: '— confort', level: 'simple' },
  { id: 't07', Icon: Inbox,         category: 'email',         name: 'Archiver emails > 30 jours',                 desc: 'D\'un label précis, avec recherche optionnelle',             integrations: ['gmail'],                  savings: '30 min/sem', level: 'simple' },
  { id: 't08', Icon: Bell,          category: 'email',         name: 'Forward emails VIP vers Slack',              desc: 'Liste d\'expéditeurs prioritaires → notif team',             integrations: ['gmail', 'slack'],         savings: '20 min/jour', level: 'simple' },

  // 💰 Facturation
  { id: 't09', Icon: Receipt,       category: 'invoicing',     name: 'Facture PDF auto à chaque vente Stripe',     desc: 'Génère, sauvegarde dans Drive, envoie au client',            integrations: ['stripe', 'drive', 'gmail'], savings: '4 h/mois', level: 'simple' },
  { id: 't10', Icon: FileSpreadsheet,category:'invoicing',     name: 'Factures mensuelles depuis Sheets',          desc: 'Lit la feuille, génère 1 PDF par ligne',                     integrations: ['sheets', 'drive', 'gmail'], savings: '6 h/mois', level: 'simple' },
  { id: 't11', Icon: AlertCircle,   category: 'invoicing',     name: 'Relance impayés J+7 / J+15 / J+30',          desc: 'Email progressif aux clients en retard',                     integrations: ['stripe', 'gmail'],        savings: '2 h/mois', level: 'simple' },

  // 📅 Agenda
  { id: 't12', Icon: Calendar,      category: 'calendar',      name: 'Récap quotidien Slack à 8h',                 desc: 'Top 3 du jour depuis Google Calendar',                       integrations: ['calendar', 'slack'],      savings: '5 min/jour', level: 'simple' },
  { id: 't13', Icon: CalendarClock, category: 'calendar',      name: 'Synchro Calendar → Notion',                  desc: 'Toutes les heures, met à jour la base',                      integrations: ['calendar', 'notion'],     savings: '— confort', level: 'simple' },
  { id: 't14', Icon: Timer,         category: 'calendar',      name: 'Tracking temps de codage',                   desc: 'Toggl → Notion, par projet, chaque jour',                    integrations: ['toggl', 'notion'],        savings: '— reporting', level: 'simple' },

  // 💬 Communication
  { id: 't15', Icon: MessageCircle, category: 'communication', name: 'Notif Discord pour nouvel abonné Stripe',    desc: 'Message dans #ventes à chaque souscription',                 integrations: ['stripe', 'discord'],      savings: '— confort', level: 'simple' },
  { id: 't16', Icon: Bell,          category: 'communication', name: 'Alerte Slack si Status Page down',           desc: 'Webhook entrant → notif urgente team',                       integrations: ['webhook', 'slack'],       savings: '— réactivité', level: 'simple' },
  { id: 't17', Icon: Twitter,       category: 'communication', name: 'Tweet quotidien à 9h',                       desc: 'Pioche dans une liste Notion préparée',                      integrations: ['notion', 'twitter'],      savings: '30 min/jour', level: 'simple' },

  // 🌐 DevOps
  { id: 't18', Icon: Rocket,        category: 'devops',        name: 'Déploiement Vercel chaque vendredi 18h',     desc: 'GitHub → Vercel → Slack, avec rollback auto',                integrations: ['github', 'vercel', 'slack'], savings: '1 h/sem', level: 'simple' },
  { id: 't19', Icon: ShieldCheck,   category: 'devops',        name: 'Vérif SSL + alerte si < 14 jours',           desc: 'Cron quotidien sur tes domaines',                            integrations: ['cron', 'gmail'],          savings: '— sécurité', level: 'simple' },
  { id: 't20', Icon: DatabaseBackup,category: 'devops',        name: 'Backup BDD Postgres → S3 chaque nuit',       desc: 'pg_dump compressé + checksum vérifié',                       integrations: ['postgres', 's3'],         savings: '— sécurité', level: 'simple' },
];

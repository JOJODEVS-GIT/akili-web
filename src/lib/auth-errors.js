/**
 * Humanise les erreurs Supabase Auth en messages compréhensibles.
 * Fidèle à la voix Akili : jamais alarmiste, toujours bienveillant.
 */
export function humanizeAuthError(error) {
  if (!error) return null;
  const msg = error.message || error.toString();

  const lower = msg.toLowerCase();

  if (lower.includes('invalid login credentials')) {
    return "Cet email ou mot de passe ne semble pas correct.";
  }
  if (lower.includes('email not confirmed')) {
    return "Cet email n'a pas encore été confirmé. Regarde dans ta boîte mail.";
  }
  if (lower.includes('user already registered') || lower.includes('already exists')) {
    return "Un compte existe déjà avec cet email. Essaie plutôt de te connecter.";
  }
  if (lower.includes('password') && lower.includes('short')) {
    return "Ce mot de passe est trop court. Six caractères minimum.";
  }
  if (lower.includes('rate limit') || lower.includes('too many requests')) {
    return "Trop de tentatives. Réessaie dans quelques minutes.";
  }
  if (lower.includes('network') || lower.includes('fetch')) {
    return "On a un souci de connexion. Vérifie ton internet et réessaie.";
  }
  if (lower.includes('email') && lower.includes('invalid')) {
    return "Cet email ne semble pas tout à fait juste.";
  }

  // Fallback générique
  return "Une erreur est survenue de notre côté. Réessaie dans un instant — si ça persiste, écris-nous à support@akili.app.";
}

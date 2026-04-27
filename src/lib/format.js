/**
 * Capitalize — première lettre en majuscule, reste tel quel.
 * "aicha" → "Aïcha"   ·   "AICHA" → "Aicha"   ·   undefined → ""
 */
export function capitalize(str) {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * formatDate — date longue en français, format "Mardi 28 avril".
 */
export function formatDate(date = new Date()) {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date);
}

/**
 * Capitalise le premier caractère d'un format de date.
 * "mardi 28 avril" → "Mardi 28 avril"
 */
export function formatDateCapitalized(date = new Date()) {
  return capitalize(formatDate(date));
}

import { LegalLayout } from '@/components/legal/LegalLayout';
import { H2, P, UL, LI, Strong, Note } from '@/components/legal/Prose';

export default function CookiesPage() {
  return (
    <LegalLayout
      eyebrow="Politique cookies"
      title="Les cookies, on en garde le minimum."
      lastUpdated="27 avril 2026"
    >
      <P>
        Cette page explique quels cookies on utilise, pourquoi, et comment tu peux les contrôler. Court et clair, sans jargon.
      </P>

      <Note title="L'essentiel" accent="or">
        On utilise <Strong>3 cookies essentiels</Strong> pour faire tourner Akili et c'est tout. Pas de tracking publicitaire, pas de cookies tiers de marketing.
      </Note>

      <H2>Qu'est-ce qu'un cookie ?</H2>
      <P>
        Un cookie est un petit fichier texte que ton navigateur stocke quand tu visites un site. Il permet au site de te reconnaître à ta prochaine visite, ou de retenir tes préférences.
      </P>

      <H2>Les cookies qu'on utilise</H2>

      <div className="my-8 overflow-x-auto">
        <table className="w-full border border-akili-line rounded-akili overflow-hidden">
          <thead className="bg-akili-papyrus-warm">
            <tr>
              <th className="text-left px-4 py-3 font-display font-bold text-xs uppercase tracking-wider">Nom</th>
              <th className="text-left px-4 py-3 font-display font-bold text-xs uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 font-display font-bold text-xs uppercase tracking-wider">Durée</th>
              <th className="text-left px-4 py-3 font-display font-bold text-xs uppercase tracking-wider">But</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-t border-akili-line">
              <td className="px-4 py-3 font-mono text-xs">akili_session</td>
              <td className="px-4 py-3"><Strong>Essentiel</Strong></td>
              <td className="px-4 py-3">Session</td>
              <td className="px-4 py-3 text-akili-charbon-soft">Te garder connecté</td>
            </tr>
            <tr className="border-t border-akili-line">
              <td className="px-4 py-3 font-mono text-xs">akili_csrf</td>
              <td className="px-4 py-3"><Strong>Essentiel</Strong></td>
              <td className="px-4 py-3">Session</td>
              <td className="px-4 py-3 text-akili-charbon-soft">Protection contre les attaques CSRF</td>
            </tr>
            <tr className="border-t border-akili-line">
              <td className="px-4 py-3 font-mono text-xs">akili_consent</td>
              <td className="px-4 py-3">Préférence</td>
              <td className="px-4 py-3">12 mois</td>
              <td className="px-4 py-3 text-akili-charbon-soft">Mémoriser ton choix sur cette bannière</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2>Cookies tiers</H2>
      <P>
        On <Strong>n'utilise aucun cookie publicitaire</Strong>. On n'utilise pas Google Analytics, Facebook Pixel, ni aucun tracker marketing.
      </P>
      <P>
        Si tu actives une intégration (Stripe, Google Drive, etc.), ces services peuvent poser leurs propres cookies pendant le flow OAuth. Consulte leurs politiques respectives.
      </P>

      <H2>Comment refuser ou supprimer les cookies</H2>
      <UL>
        <LI>Tu peux refuser tous les cookies non essentiels via la bannière en bas de l'écran</LI>
        <LI>Tu peux les supprimer via les paramètres de ton navigateur à tout moment</LI>
        <LI>Si tu refuses les cookies essentiels, Akili ne pourra pas te connecter</LI>
      </UL>

      <H2>Une question ?</H2>
      <P>
        Écris-nous à <Strong>privacy@akili.app</Strong>.
      </P>
    </LegalLayout>
  );
}

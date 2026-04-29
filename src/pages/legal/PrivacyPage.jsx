import { LegalLayout } from '@/components/legal/LegalLayout';
import { H2, H3, P, UL, LI, Strong, Note } from '@/components/legal/Prose';

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Politique de confidentialité"
      title="Tes données. Tes règles."
      lastUpdated="27 avril 2026"
    >
      <P>
        Cette politique explique comment Akili collecte, utilise et protège tes données. On l'a écrite avec un engagement clair : <Strong>on ne vend pas tes données. Jamais.</Strong>
      </P>

      <Note title="L'essentiel en une phrase" accent="indigo">
        On collecte le strict nécessaire pour faire tourner Akili, on chiffre tout, on respecte le RGPD, et tu peux supprimer tes données à tout moment.
      </Note>

      <H2 id="responsable">1. Qui est responsable ?</H2>
      {/* TODO LEGAL : remplir le numéro RCCM et l'adresse du siège avant le lancement public. */}
      <P>
        Le responsable du traitement est <Strong>Akili SAS</Strong>, immatriculée au RCCM de Cotonou sous le numéro <Strong>RCCM-RB-COT-2026-XXXXXX</Strong> (en cours d'immatriculation), dont le siège est situé à <Strong>Cotonou, Bénin</Strong>. Notre Data Protection Officer (DPO) : <Strong>dpo@akili.app</Strong>.
      </P>

      <H2 id="donnees">2. Quelles données on collecte</H2>

      <H3>Données que tu nous donnes directement</H3>
      <UL>
        <LI><Strong>Compte</Strong> : prénom, email, mot de passe (chiffré bcrypt)</LI>
        <LI><Strong>Profil</Strong> : avatar, bio, ville (optionnels)</LI>
        <LI><Strong>Paiement</Strong> : géré par Stripe — on ne stocke jamais tes infos CB</LI>
        <LI><Strong>Automatisations</Strong> : noms, descriptions, configs que tu crées</LI>
      </UL>

      <H3>Données collectées automatiquement</H3>
      <UL>
        <LI><Strong>Logs techniques</Strong> : IP, navigateur, OS (90 jours puis suppression)</LI>
        <LI><Strong>Métriques d'usage</Strong> : nombre d'exécutions, temps de réponse (anonymisées)</LI>
        <LI><Strong>Cookies essentiels</Strong> : session, préférences (voir <Strong>Politique cookies</Strong>)</LI>
      </UL>

      <H3>Tokens d'intégration</H3>
      <P>
        Quand tu connectes Gmail, Drive, Stripe etc., Akili stocke un token OAuth chiffré. <Strong>Nous n'accédons jamais à tes données externes en dehors des automatisations que tu as créées.</Strong>
      </P>

      <H2 id="usage">3. Pour quoi on utilise tes données</H2>
      <UL>
        <LI>Faire fonctionner le service (exécution des automatisations)</LI>
        <LI>T'authentifier et sécuriser ton compte</LI>
        <LI>Te facturer si tu es sur un plan payant</LI>
        <LI>Te contacter pour le support et les mises à jour importantes</LI>
        <LI>Améliorer le produit (analytics anonymisées)</LI>
      </UL>
      <P>
        On <Strong>n'utilise pas</Strong> tes données pour entraîner des modèles d'IA. On <Strong>ne vend pas</Strong> tes données. On <Strong>ne partage pas</Strong> tes données avec des tiers, sauf obligation légale ou prestataires sous contrat (hébergeur, paiement).
      </P>

      <H2 id="hebergement">4. Où sont stockées tes données</H2>
      <P>
        Tes données sont hébergées en <Strong>Europe</Strong> (région eu-west-3, Paris) chez Supabase / AWS. Aucune donnée n'est transférée hors UE sans tes consentements explicites.
      </P>

      <H2 id="securite">5. Comment on les protège</H2>
      <UL>
        <LI>Chiffrement <Strong>AES-256 au repos</Strong>, <Strong>TLS 1.3 en transit</Strong></LI>
        <LI>Mots de passe hachés avec bcrypt (cost 12)</LI>
        <LI>Tokens OAuth chiffrés avec une clé spécifique par utilisateur</LI>
        <LI>Authentification à deux facteurs (2FA) optionnelle</LI>
        <LI>Backups quotidiens chiffrés, stockés 30 jours</LI>
        <LI>Audits de sécurité annuels par un tiers</LI>
      </UL>

      <H2 id="droits">6. Tes droits (RGPD)</H2>
      <P>Tu peux à tout moment :</P>
      <UL>
        <LI><Strong>Accéder</Strong> à toutes les données qu'on a sur toi (export JSON dans Paramètres)</LI>
        <LI><Strong>Rectifier</Strong> tes infos via ton profil</LI>
        <LI><Strong>Supprimer</Strong> ton compte (suppression sous 30 jours)</LI>
        <LI><Strong>Limiter</Strong> certains traitements (cookies analytiques par exemple)</LI>
        <LI><Strong>Porter</Strong> tes données vers un autre service (export structuré)</LI>
        <LI><Strong>Te plaindre</Strong> auprès d'une autorité de contrôle (CNIL en France, APDP au Bénin)</LI>
      </UL>
      <P>
        Pour exercer un droit : <Strong>privacy@akili.app</Strong>. On répond sous 30 jours maximum.
      </P>

      <H2 id="duree">7. Combien de temps on garde tes données</H2>
      <UL>
        <LI><Strong>Compte actif</Strong> : tant que tu utilises Akili</LI>
        <LI><Strong>Compte supprimé</Strong> : suppression complète sous 30 jours</LI>
        <LI><Strong>Données de facturation</Strong> : 10 ans (obligation légale)</LI>
        <LI><Strong>Logs techniques</Strong> : 90 jours puis suppression auto</LI>
      </UL>

      <H2 id="contact">8. Une question ?</H2>
      <P>
        Notre DPO te répond personnellement : <Strong>dpo@akili.app</Strong>.
      </P>
    </LegalLayout>
  );
}

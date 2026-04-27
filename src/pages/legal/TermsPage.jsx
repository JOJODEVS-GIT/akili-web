import { LegalLayout } from '@/components/legal/LegalLayout';
import { H2, H3, P, UL, LI, Strong, Note } from '@/components/legal/Prose';

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Conditions générales"
      title="Tu utilises Akili. Voici ce qui nous lie."
      lastUpdated="27 avril 2026"
    >
      <P>
        Bienvenue sur Akili. Ces Conditions Générales d'Utilisation (« CGU ») fixent les règles entre toi et nous quand tu utilises notre plateforme d'automatisation. En t'inscrivant ou en utilisant Akili, tu acceptes ces conditions. Pas de blabla légal qui n'a pas de sens — on a essayé d'écrire ça simplement.
      </P>

      <Note title="L'essentiel" accent="coral">
        Tu es responsable de tes automatisations. On est responsable de la plateforme. Si l'un de nous casse quelque chose, on en discute avant de se fâcher.
      </Note>

      <H2 id="acceptation">1. Acceptation des conditions</H2>
      <P>
        En créant un compte Akili, tu confirmes avoir au moins <Strong>16 ans</Strong>, ou avoir l'autorisation de tes parents, et accepter les présentes CGU. Si tu utilises Akili au nom d'une entreprise, tu confirmes avoir le pouvoir d'engager cette entreprise.
      </P>

      <H2 id="service">2. Description du service</H2>
      <P>
        Akili est une plateforme SaaS qui permet de créer, exécuter et planifier des automatisations qui connectent différents services (Gmail, Drive, Stripe, Slack, etc.). Le service est fourni « en l'état » avec une volonté de qualité, mais sans garantie absolue de disponibilité.
      </P>
      <UL>
        <LI>Disponibilité visée : <Strong>99,5 %</Strong> de uptime mensuel</LI>
        <LI>Maintenance planifiée : annoncée 48 h à l'avance</LI>
        <LI>Support disponible : du lundi au vendredi, 9 h–18 h GMT</LI>
      </UL>

      <H2 id="compte">3. Ton compte</H2>
      <P>
        Tu es responsable de la confidentialité de ton mot de passe et de toutes les actions effectuées depuis ton compte. Si tu suspectes une utilisation frauduleuse, contacte-nous immédiatement à <Strong>support@akili.app</Strong>.
      </P>
      <P>
        Tu peux supprimer ton compte à tout moment depuis Paramètres → Zone dangereuse. La suppression est définitive et entraîne la perte de toutes tes automatisations.
      </P>

      <H2 id="usage">4. Utilisation acceptable</H2>
      <P>Tu t'engages à ne pas utiliser Akili pour :</P>
      <UL>
        <LI>Envoyer du spam ou contenu non sollicité en masse</LI>
        <LI>Contourner les limites de quota d'API tierces</LI>
        <LI>Stocker ou transmettre des données illégales (atteintes mineurs, haine, etc.)</LI>
        <LI>Tenter de pirater l'infrastructure d'Akili ou d'autres utilisateurs</LI>
        <LI>Revendre l'accès à Akili sans accord écrit</LI>
      </UL>
      <P>
        Toute violation peut entraîner la suspension immédiate du compte sans remboursement.
      </P>

      <H2 id="paiement">5. Plans payants et facturation</H2>
      <P>
        Le plan Atelier est gratuit à vie. Les plans Pro (12 €/mois) et Team (39 €/mois) sont facturés par prélèvement automatique mensuel ou annuel. Tu peux annuler à tout moment ; l'annulation prend effet à la fin de la période payée.
      </P>
      <P>
        Tous les prix sont en euros, hors taxes. La TVA applicable est ajoutée selon ta localisation.
      </P>

      <H2 id="propriete">6. Propriété intellectuelle</H2>
      <P>
        Akili (le code, les marques, le design) reste la propriété d'Akili. <Strong>Tes données et tes automatisations restent ta propriété.</Strong> Tu nous accordes simplement le droit de les héberger et de les exécuter pour toi. À la suppression de ton compte, on supprime tout sous 30 jours.
      </P>

      <H2 id="responsabilite">7. Limitation de responsabilité</H2>
      <P>
        Akili ne peut être tenu responsable des dommages indirects, perte de données ou perte de revenus liés à l'utilisation du service. Notre responsabilité maximale est limitée aux montants que tu as payés sur les 12 derniers mois.
      </P>

      <H2 id="modifications">8. Modifications des CGU</H2>
      <P>
        On peut modifier ces CGU pour les adapter à l'évolution du service ou de la loi. En cas de changement majeur, on te prévient par email au moins 30 jours avant l'entrée en vigueur. Si tu n'acceptes pas, tu peux fermer ton compte.
      </P>

      <H2 id="droit">9. Droit applicable</H2>
      <P>
        Ces CGU sont régies par le droit béninois. En cas de litige, on cherchera d'abord une solution amiable. À défaut, le tribunal compétent est celui de Cotonou.
      </P>

      <H2 id="contact">10. Une question ?</H2>
      <P>
        Écris-nous à <Strong>legal@akili.app</Strong>. On répond sous 5 jours ouvrés.
      </P>
    </LegalLayout>
  );
}

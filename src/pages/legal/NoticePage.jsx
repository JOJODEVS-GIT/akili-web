import { LegalLayout } from '@/components/legal/LegalLayout';
import { H2, P, Strong } from '@/components/legal/Prose';

export default function NoticePage() {
  return (
    <LegalLayout
      eyebrow="Mentions légales"
      title="Qui édite ce site ?"
      lastUpdated="27 avril 2026"
    >
      <H2>Éditeur du site</H2>
      <P>
        Le site <Strong>akili.app</Strong> est édité par :
        <br />
        <Strong>Akili SAS</Strong>
        <br />
        Société par Actions Simplifiée au capital de [à compléter] €
        <br />
        Siège social : [adresse, Cotonou, Bénin]
        <br />
        RCCM : [numéro à compléter]
        <br />
        Email : <Strong>contact@akili.app</Strong>
      </P>

      <H2>Directeur de la publication</H2>
      <P>
        [Nom du fondateur/directeur]
      </P>

      <H2>Hébergement</H2>
      <P>
        Le site est hébergé par :
        <br />
        <Strong>Vercel Inc.</Strong>
        <br />
        340 S Lemon Ave #4133, Walnut, CA 91789, USA
        <br />
        Support : <Strong>support@vercel.com</Strong>
      </P>
      <P>
        Les données utilisateur sont stockées sur :
        <br />
        <Strong>Supabase Inc.</Strong>
        <br />
        970 Toa Payoh North #07-04, Singapore — région d'hébergement : eu-west-3 (Paris)
      </P>

      <H2>Propriété intellectuelle</H2>
      <P>
        L'ensemble du contenu de ce site (textes, images, vidéos, logos, code, charte graphique) est protégé par le droit d'auteur et reste la propriété exclusive d'Akili SAS, sauf mention contraire.
      </P>
      <P>
        Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est interdite.
      </P>

      <H2>Contact</H2>
      <P>
        Pour toute question : <Strong>contact@akili.app</Strong>.
      </P>
    </LegalLayout>
  );
}

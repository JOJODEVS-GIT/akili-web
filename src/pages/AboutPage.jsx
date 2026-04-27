import { LegalLayout } from '@/components/legal/LegalLayout';
import { H2, P, Strong } from '@/components/legal/Prose';

export default function AboutPage() {
  return (
    <LegalLayout
      eyebrow="À propos"
      title="On rend aux gens leurs heures."
    >
      <P>
        Akili est née d'une frustration partagée par notre fondatrice : passer ses vendredis soir à uploader des fichiers manuellement, à générer des factures à la chaîne, à répéter les mêmes commandes shell pour déployer un site. Pendant ce temps, ses idées, ses projets, sa vie attendaient.
      </P>
      <P>
        En swahili, <Strong>Akili</Strong> signifie <em>intelligence, sagesse, savoir-faire</em>. Ce nom n'est pas un hasard — il incarne notre philosophie : mettre la puissance de l'automatisation à la portée de tous, avec la sagesse pour guide.
      </P>

      <H2>Trois mots qui nous résument</H2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-8">
        <Pillar n="01" title="Intelligent" body="Akili apprend tes flux et propose des automatisations qui ont du sens." color="coral" />
        <Pillar n="02" title="Accessible"  body="Une commande, un clic, un raccourci clavier. Aucune ligne de code." color="or" />
        <Pillar n="03" title="Africain"    body="Conçu en Afrique pour le monde. Latence faible, monnaies locales." color="indigo" />
      </div>

      <H2>Pourquoi en Afrique ?</H2>
      <P>
        Parce que les freelances africains, les PME africaines, les étudiants africains méritent les meilleurs outils — et qu'aucune raison technique ne justifie qu'ils paient plus cher pour de la latence et un support en anglais à 3 h du matin.
      </P>
      <P>
        On bâtit Akili depuis Cotonou, on fait équipe avec des designers et développeurs à Lagos, Dakar, Abidjan, Nairobi. La diaspora francophone à Paris contribue aussi. <Strong>Notre force, c'est notre réseau panafricain.</Strong>
      </P>

      <H2>Notre vision</H2>
      <P>
        D'ici fin 2027, on veut que <Strong>1 million d'heures</Strong> soient récupérées chaque mois grâce à Akili. Pour ça, on construit :
      </P>
      <ul className="list-disc pl-6 space-y-2 mb-4 font-sans text-base leading-relaxed text-akili-charbon-soft marker:text-akili-coral">
        <li>Une plateforme robuste, open par construction (API publique, webhooks, intégrations communautaires)</li>
        <li>Des intégrations natives avec les outils du quotidien africain (Wave, MTN MoMo, Orange Money — bêta cet été)</li>
        <li>Une bibliothèque de templates partagés par la communauté</li>
        <li>Un programme étudiants : Akili gratuit pour toute personne en cursus tech / freelance émergent</li>
      </ul>

      <H2>Rejoindre l'aventure</H2>
      <P>
        On recrute en design, dev backend, ops. <Strong>jobs@akili.app</Strong> — une lettre courte mais sincère vaut mieux qu'un CV LinkedIn. On lit tout.
      </P>
    </LegalLayout>
  );
}

function Pillar({ n, title, body, color }) {
  const colors = {
    coral:  'border-t-akili-coral text-akili-coral',
    or:     'border-t-akili-or text-akili-or-700',
    indigo: 'border-t-akili-indigo text-akili-indigo',
  };
  return (
    <div className={`bg-white border border-akili-line ${colors[color].split(' ')[0]} border-t-4 rounded-akili p-5`}>
      <span className={`font-mono text-xs ${colors[color].split(' ')[1]} font-medium`}>{n}</span>
      <h3 className="font-display font-extrabold text-lg mt-2">{title}</h3>
      <p className="text-sm text-akili-charbon-soft leading-relaxed mt-1.5">{body}</p>
    </div>
  );
}

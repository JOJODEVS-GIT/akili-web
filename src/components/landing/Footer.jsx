import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { useToast } from '@/components/ui/Toast';

const COLS = [
  {
    title: 'Produit',
    links: [
      { label: 'Fonctionnalités', to: '/#produit' },
      { label: 'Tarifs',          to: '/#tarifs' },
      { label: 'Changelog',       to: '/changelog' },
      { label: 'Statut',          to: '/status' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { label: 'Documentation',   to: '/app/docs' },
      { label: 'Cas d\'usage',     to: '/#cas-usage' },
      { label: 'API',             to: '/app/docs' },
      { label: 'Contact',         to: '/contact' },
    ],
  },
  {
    title: 'Akili',
    links: [
      { label: 'À propos',        to: '/about' },
      { label: 'Contact',         to: '/contact' },
      { label: 'Carrières',       to: '/contact' },
      { label: 'Mentions légales',to: '/legal/notice' },
    ],
  },
];

const SOCIAL = [
  { Icon: Twitter,  label: 'Twitter',  href: 'https://twitter.com/akili_app' },
  { Icon: Github,   label: 'GitHub',   href: 'https://github.com/akili-app' },
  { Icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/akili-app' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      toast({ type: 'error', title: 'Email invalide', description: 'On a besoin d\'une adresse email valide.' });
      return;
    }
    setEmail('');
    toast({ type: 'success', title: 'Inscription confirmée', description: 'On t\'envoie le prochain numéro dans quelques jours.' });
  };

  return (
    <footer className="bg-akili-indigo-950 text-akili-charbon-mute relative">
      {/* Bande signature 3-blocs en haut */}
      <div className="absolute top-0 inset-x-0 h-1 flex" aria-hidden>
        <span className="flex-1 bg-akili-coral" />
        <span className="flex-1 bg-akili-or" />
        <span className="flex-1 bg-akili-papyrus" />
      </div>

      <Container size="xl" className="pt-22 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_repeat(3,1fr)_1.3fr] gap-10 lg:gap-12">
          {/* Bio + social */}
          <div>
            <Logo size="md" onDark />
            <p className="font-sans text-[13px] mt-5 max-w-[300px] leading-relaxed text-akili-charbon-mute">
              Akili — la sagesse qui se lève. Boîte à outils d'automatisation, conçue avec soin à Cotonou.
            </p>
            <div className="flex gap-2.5 mt-6">
              {SOCIAL.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-akili border flex items-center justify-center text-akili-charbon-mute hover:text-akili-or hover:border-akili-or transition-colors duration-200"
                  style={{ borderColor: '#1F2D52' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Colonnes */}
          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="font-display font-bold text-xs tracking-[0.1em] uppercase text-akili-or">
                {c.title}
              </h4>
              <ul className="list-none p-0 mt-3.5 flex flex-col gap-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="font-sans text-sm text-akili-indigo-100 hover:text-akili-or transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-xs tracking-[0.1em] uppercase text-akili-or">
              Reste informé
            </h4>
            <p className="font-sans text-[13px] mt-3 leading-relaxed text-akili-charbon-mute">
              Un email par mois. Pas de spam. Promis.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.io"
                className="flex-1 h-10 px-3 bg-akili-indigo border rounded-akili font-sans text-[13px] text-akili-papyrus placeholder:text-akili-charbon-mute outline-none focus:border-akili-or focus:ring-2 focus:ring-akili-or/30 transition-all"
                style={{ borderColor: '#1F2D52' }}
              />
              <button
                type="submit"
                aria-label="S'inscrire à la newsletter"
                className="w-10 h-10 rounded-akili bg-akili-coral text-white flex items-center justify-center hover:bg-akili-coral-700 transition-colors"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t mt-12 pt-6 flex flex-wrap justify-between gap-3 text-xs text-akili-indigo-400"
          style={{ borderColor: '#1F2D52' }}
        >
          <span>© 2026 Akili. Cotonou · Lagos · Paris.</span>
          <span className="inline-flex flex-wrap gap-4 sm:gap-6">
            <Link to="/legal/privacy" className="text-akili-indigo-400 hover:text-akili-papyrus transition-colors">Confidentialité</Link>
            <Link to="/legal/terms"   className="text-akili-indigo-400 hover:text-akili-papyrus transition-colors">Conditions</Link>
            <Link to="/legal/cookies" className="text-akili-indigo-400 hover:text-akili-papyrus transition-colors">Cookies</Link>
            <Link to="/legal/notice"  className="text-akili-indigo-400 hover:text-akili-papyrus transition-colors">Mentions légales</Link>
          </span>
        </div>
      </Container>
    </footer>
  );
}

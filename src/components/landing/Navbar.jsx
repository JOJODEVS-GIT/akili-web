import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

const NAV_LINKS = [
  { label: 'Produit',      href: '#produit' },
  { label: "Cas d'usage",  href: '#cas-usage' },
  { label: 'Tarifs',       href: '#tarifs' },
  { label: 'Comment ça marche', href: '#how-it-works' },
];

export function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-akili-line"
      style={{
        background: 'rgba(249, 243, 230, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <Container size="xl" className="flex items-center justify-between h-18 py-4">
        <Link to="/" className="cursor-pointer no-underline">
          <Logo size="md" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-akili-charbon-soft hover:text-akili-coral transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Se connecter</Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary" size="sm">Commencer</Button>
          </Link>
        </div>
      </Container>
    </header>
  );
}

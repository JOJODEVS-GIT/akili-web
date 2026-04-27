import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-akili-papyrus flex flex-col">
      <header className="py-6">
        <Container size="xl">
          <Link to="/"><Logo size="md" /></Link>
        </Container>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <Container size="md" className="text-center">
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
            Page introuvable
          </span>
          <h1 className="font-display font-extrabold text-[96px] leading-none tracking-[-0.04em] text-akili-indigo mt-4">
            404<span className="text-akili-coral">.</span>
          </h1>
          <p className="font-sans text-lg text-akili-charbon-soft mt-6 max-w-[480px] mx-auto leading-relaxed">
            On n'a pas trouvé cette page. Pas grave — tout le reste fonctionne.
            Reviens à l'accueil et reprends ta route.
          </p>
          <Link to="/" className="inline-block mt-10">
            <Button variant="primary" size="lg" iconLeft={<ArrowLeft size={18} />}>
              Retour à l'accueil
            </Button>
          </Link>
        </Container>
      </main>
    </div>
  );
}

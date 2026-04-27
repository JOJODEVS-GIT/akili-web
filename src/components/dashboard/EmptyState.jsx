import { Sparkles, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function EmptyState({ onCreate }) {
  return (
    <div className="px-8 py-16 text-center flex flex-col items-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-akili-papyrus-deep flex items-center justify-center text-akili-coral">
        <Sparkles size={28} strokeWidth={1.75} />
      </div>
      <h3 className="font-display font-extrabold text-2xl tracking-[-0.02em]">
        Ton premier souffle commence ici.
      </h3>
      <p className="font-sans text-sm text-akili-charbon-soft max-w-[380px] leading-[1.55]">
        Aucune automatisation pour l'instant. Décris ce qui te prend du temps, Akili s'occupe du reste.
      </p>
      <Button size="md" variant="primary" onClick={onCreate} iconLeft={<Plus size={16} />}>
        Créer ma première automatisation
      </Button>
    </div>
  );
}

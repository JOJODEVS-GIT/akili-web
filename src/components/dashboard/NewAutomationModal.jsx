/**
 * NewAutomationModal — wizard simple pour créer une automatisation.
 * Pour le hackathon : UI fonctionnelle, créé en local, pas de persistance backend.
 */
import { useState } from 'react';
import { FileText, Rocket, FolderTree, DatabaseBackup, UserPlus, ArrowRight } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const TEMPLATES = [
  { id: 'invoice',   Icon: FileText,       title: 'Factures → PDF',         desc: 'Stripe → Drive → Email' },
  { id: 'deploy',    Icon: Rocket,         title: 'Déploiement programmé',  desc: 'GitHub → SSH → Slack'   },
  { id: 'sort',      Icon: FolderTree,     title: 'Tri uploads',            desc: 'Drive → renommer → classer' },
  { id: 'backup',    Icon: DatabaseBackup, title: 'Backup base',            desc: 'pg_dump → S3 → checksum' },
  { id: 'onboard',   Icon: UserPlus,       title: 'Onboarding client',      desc: 'HubSpot → Notion → Slack' },
  { id: 'custom',    Icon: ArrowRight,     title: 'Personnalisé',           desc: 'Décris ton besoin à Akili' },
];

export function NewAutomationModal({ isOpen, onClose, onCreate }) {
  const [step, setStep] = useState(0);
  const [template, setTemplate] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => { setStep(0); setTemplate(null); setName(''); setLoading(false); };
  const handleClose = () => { onClose?.(); setTimeout(reset, 250); };

  const submit = () => {
    if (!template || !name.trim()) return;
    setLoading(true);
    setTimeout(() => {
      onCreate?.({ template, name: name.trim() });
      handleClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Nouvelle automatisation"
      description={step === 0 ? 'Choisis un point de départ. Tu pourras tout modifier ensuite.' : 'Donne-lui un nom parlant. Tu sauras toujours ce qu\'elle fait.'}
      size="lg"
    >
      {/* Stepper indicator */}
      <div className="flex items-center gap-2 mb-6">
        {[0, 1].map((i) => (
          <span
            key={i}
            className={cn(
              'h-1 rounded-full flex-1 transition-all duration-300',
              i <= step ? 'bg-akili-coral' : 'bg-akili-papyrus-deep'
            )}
          />
        ))}
        <span className="font-mono text-xs text-akili-charbon-mute ml-2">
          {step + 1} / 2
        </span>
      </div>

      {step === 0 && (
        <>
          <div className="grid grid-cols-2 gap-3">
            {TEMPLATES.map((t) => {
              const isActive = template?.id === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTemplate(t)}
                  className={cn(
                    'text-left p-4 rounded-akili border-2 transition-all duration-200',
                    isActive
                      ? 'border-akili-coral bg-akili-coral-50 shadow-akili-sm'
                      : 'border-akili-line bg-white hover:border-akili-coral/40'
                  )}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-akili flex items-center justify-center mb-3',
                    isActive ? 'bg-akili-coral text-white' : 'bg-akili-papyrus-deep text-akili-indigo'
                  )}>
                    <t.Icon size={18} />
                  </div>
                  <div className="font-display font-bold text-[14px] text-akili-charbon">
                    {t.title}
                  </div>
                  <div className="font-sans text-[12px] text-akili-charbon-mute mt-0.5">
                    {t.desc}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center mt-6">
            <Button variant="ghost" onClick={handleClose}>Annuler</Button>
            <Button
              variant="primary"
              disabled={!template}
              onClick={() => setStep(1)}
              iconRight={<ArrowRight size={16} />}
            >
              Continuer
            </Button>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <div className="p-4 rounded-akili bg-akili-papyrus-warm border border-akili-line flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-akili bg-white flex items-center justify-center text-akili-coral border border-akili-line">
              <template.Icon size={18} />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-akili-charbon-mute font-bold">
                Template choisi
              </div>
              <div className="font-display font-bold text-[14px] text-akili-charbon">
                {template.title}
              </div>
            </div>
          </div>

          <Input
            label="Nom de ton automatisation"
            required
            value={name}
            onChange={setName}
            placeholder="Ex : Factures clients juin"
            autoFocus
            helper="Tu pourras le changer à tout moment."
          />

          <div className="flex justify-between items-center mt-6">
            <Button variant="ghost" onClick={() => setStep(0)}>Retour</Button>
            <Button
              variant="primary"
              loading={loading}
              disabled={!name.trim()}
              onClick={submit}
            >
              {loading ? 'On la prépare…' : 'Créer'}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}

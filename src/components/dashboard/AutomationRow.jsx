import { DotsThree as MoreHorizontal, Play, Pencil, Pause, Trash as Trash2 } from '@phosphor-icons/react';
import { Badge } from '@/components/ui/Badge';
import { Dropdown } from '@/components/ui/Dropdown';

const STATUS_VARIANTS = {
  actif:     'success',
  planifié:  'indigo',
  échec:     'error',
  brouillon: 'neutral',
};

/**
 * AutomationRow — row desktop (grid) + card mobile (block).
 * Le menu "..." est fonctionnel via Dropdown.
 */
export function AutomationRow({ automation, onAction }) {
  const a = automation;
  const Icon = a.Icon;
  const variant = STATUS_VARIANTS[a.status] || 'neutral';

  const menuItems = [
    { Icon: Play,   label: 'Lancer maintenant',  onClick: () => onAction?.('run', a) },
    { Icon: Pencil, label: 'Modifier',           onClick: () => onAction?.('edit', a) },
    { Icon: Pause,  label: 'Désactiver',         onClick: () => onAction?.('pause', a) },
    { divider: true },
    { Icon: Trash2, label: 'Supprimer', danger: true, onClick: () => onAction?.('delete', a) },
  ];

  return (
    <div className="border-b border-akili-line last:border-b-0 transition-colors duration-200 hover:bg-akili-papyrus-warm">
      {/* Desktop layout (grid) */}
      <div className="hidden md:grid grid-cols-[40px_1fr_140px_140px_140px_36px] items-center gap-4 px-5 py-3.5">
        <span className="w-9 h-9 rounded-akili bg-akili-papyrus-deep flex items-center justify-center text-akili-indigo">
          <Icon size={16} />
        </span>

        <div className="min-w-0">
          <div className="font-display font-bold text-[15px] text-akili-charbon truncate">
            {a.name}
          </div>
          <div className="font-sans text-xs text-akili-charbon-mute mt-0.5 truncate">
            {a.desc}
          </div>
        </div>

        <Badge variant={variant} dot>{a.status}</Badge>

        <span className="font-mono text-xs text-akili-charbon-soft">
          {a.lastRun}
        </span>

        <span className="font-sans text-[13px] text-akili-charbon-soft">
          {a.savings}
        </span>

        <Dropdown
          align="right"
          trigger={
            <button
              type="button"
              aria-label="Actions"
              className="w-8 h-8 bg-transparent border-none cursor-pointer text-akili-charbon-mute rounded-md hover:bg-white hover:text-akili-charbon transition-colors flex items-center justify-center"
            >
              <MoreHorizontal size={16} />
            </button>
          }
          items={menuItems}
        />
      </div>

      {/* Mobile layout (card) */}
      <div className="md:hidden px-4 py-4 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <span className="shrink-0 w-10 h-10 rounded-akili bg-akili-papyrus-deep flex items-center justify-center text-akili-indigo">
            <Icon size={18} />
          </span>
          <div className="flex-1 min-w-0">
            <div className="font-display font-bold text-[15px] text-akili-charbon">
              {a.name}
            </div>
            <div className="font-sans text-xs text-akili-charbon-mute mt-0.5">
              {a.desc}
            </div>
          </div>
          <Dropdown
            align="right"
            trigger={
              <button
                type="button"
                aria-label="Actions"
                className="w-9 h-9 bg-transparent border-none cursor-pointer text-akili-charbon-mute rounded-md hover:bg-white transition-colors flex items-center justify-center"
              >
                <MoreHorizontal size={18} />
              </button>
            }
            items={menuItems}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Badge variant={variant} dot>{a.status}</Badge>
          <span className="font-mono text-akili-charbon-soft">{a.lastRun}</span>
          <span className="text-akili-charbon-mute">·</span>
          <span className="text-akili-charbon-soft">{a.savings}</span>
        </div>
      </div>
    </div>
  );
}

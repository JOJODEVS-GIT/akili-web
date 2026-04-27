/**
 * Dropdown — menu contextuel léger avec animation et click-outside.
 *
 * Usage:
 *   <Dropdown trigger={<Button>...</Button>} items={[
 *     { Icon: User, label: 'Profil',     onClick: () => {} },
 *     { Icon: LogOut, label: 'Déconnexion', onClick: () => {}, danger: true },
 *   ]} />
 */
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export function Dropdown({ trigger, items = [], align = 'right', className }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
              'absolute z-50 mt-2 min-w-[200px] bg-white border border-akili-line rounded-akili shadow-akili-lg overflow-hidden',
              align === 'right' ? 'right-0' : 'left-0'
            )}
          >
            <ul className="py-1">
              {items.map((item, i) => {
                if (item.divider) {
                  return <li key={`div-${i}`} className="my-1 h-px bg-akili-line" />;
                }
                const Icon = item.Icon;
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => {
                        item.onClick?.();
                        setOpen(false);
                      }}
                      className={cn(
                        'w-full text-left flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium transition-colors',
                        item.danger
                          ? 'text-akili-error hover:bg-akili-coral-50'
                          : 'text-akili-charbon hover:bg-akili-papyrus-warm'
                      )}
                    >
                      {Icon && <Icon size={16} strokeWidth={1.75} />}
                      <span className="flex-1">{item.label}</span>
                      {item.shortcut && (
                        <span className="font-mono text-[11px] text-akili-charbon-mute">
                          {item.shortcut}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, CheckCircle2, AlertTriangle, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/cn';

const SAMPLE_NOTIFS = [
  {
    id: 1,
    type: 'success',
    title: 'Factures mensuelles → PDF',
    desc: 'Terminé en 12,4 s · 47 factures envoyées',
    time: 'il y a 12 min',
    Icon: CheckCircle2,
    unread: true,
  },
  {
    id: 2,
    type: 'warning',
    title: 'GitHub : token expire dans 3 jours',
    desc: 'Renouvelle pour éviter une coupure du déploiement vendredi.',
    time: 'il y a 2 h',
    Icon: AlertTriangle,
    unread: true,
  },
  {
    id: 3,
    type: 'info',
    title: 'Nouveau template disponible',
    desc: 'Tracking temps de codage (Toggl → Notion).',
    time: 'hier',
    Icon: Sparkles,
    unread: true,
  },
  {
    id: 4,
    type: 'success',
    title: 'Backup base Postgres',
    desc: 'Terminé · 2,1 Go sauvegardés sur S3.',
    time: 'cette nuit',
    Icon: CheckCircle2,
    unread: false,
  },
];

const ICON_STYLES = {
  success: 'bg-emerald-50 text-akili-success',
  warning: 'bg-amber-50 text-akili-warning',
  info:    'bg-akili-indigo-50 text-akili-indigo',
  error:   'bg-akili-coral-50 text-akili-error',
};

export function NotificationsPanel({ open, onClose, anchorRef }) {
  const ref = useRef(null);
  const [notifs, setNotifs] = useState(SAMPLE_NOTIFS);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target) && !anchorRef?.current?.contains(e.target)) {
        onClose?.();
      }
    };
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, anchorRef]);

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
  const dismiss = (id) => setNotifs((prev) => prev.filter((n) => n.id !== id));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute right-0 top-12 w-[380px] max-w-[calc(100vw-2rem)] bg-white border border-akili-line rounded-akili shadow-akili-lg z-[60] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-akili-line">
            <div className="flex items-center gap-2">
              <Bell size={14} className="text-akili-charbon-soft" />
              <span className="font-display font-extrabold text-sm">Notifications</span>
              {notifs.filter((n) => n.unread).length > 0 && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-akili-coral text-white rounded-pill">
                  {notifs.filter((n) => n.unread).length}
                </span>
              )}
            </div>
            <button
              onClick={markAllRead}
              className="text-[11px] font-medium text-akili-coral hover:underline"
            >
              Tout marquer lu
            </button>
          </div>

          {/* List */}
          <div className="max-h-[400px] overflow-y-auto">
            {notifs.length === 0 ? (
              <div className="p-8 text-center text-sm text-akili-charbon-mute">
                Aucune notification. Tout va bien.
              </div>
            ) : (
              notifs.map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    'group relative flex items-start gap-3 px-4 py-3 border-b border-akili-line last:border-b-0 transition-colors hover:bg-akili-papyrus-warm',
                    n.unread && 'bg-akili-papyrus-deep/30'
                  )}
                >
                  {n.unread && (
                    <span className="absolute left-1 top-4 w-1.5 h-1.5 rounded-full bg-akili-coral" />
                  )}
                  <span className={cn(
                    'shrink-0 w-8 h-8 rounded-md flex items-center justify-center mt-0.5',
                    ICON_STYLES[n.type]
                  )}>
                    <n.Icon size={14} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-[13px] text-akili-charbon">
                      {n.title}
                    </div>
                    <div className="text-xs text-akili-charbon-soft mt-0.5 leading-relaxed">
                      {n.desc}
                    </div>
                    <div className="font-mono text-[11px] text-akili-charbon-mute mt-1">
                      {n.time}
                    </div>
                  </div>
                  <button
                    onClick={() => dismiss(n.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-akili-charbon-mute hover:text-akili-charbon"
                    aria-label="Ignorer"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-akili-line bg-akili-papyrus-warm">
            <button className="w-full text-center text-[12px] font-medium text-akili-indigo hover:text-akili-coral transition-colors">
              Voir toutes les notifications
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

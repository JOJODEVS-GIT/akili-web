/**
 * Toast — système de notifications légères pour feedback d'actions.
 *
 * Usage :
 *   const { toast } = useToast();
 *   toast({ type: 'success', title: 'Automatisation créée' });
 *
 * Wrap l'app avec <ToastProvider> dans App.jsx.
 */
import { createContext, useCallback, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle as CheckCircle2, WarningCircle as AlertCircle, Warning as AlertTriangle, Info, X } from '@phosphor-icons/react';
import { cn } from '@/lib/cn';

const ToastContext = createContext(null);

const TYPES = {
  success: { Icon: CheckCircle2,   color: 'text-akili-success', bg: 'bg-emerald-50',  border: 'border-emerald-200' },
  error:   { Icon: AlertCircle,    color: 'text-akili-error',   bg: 'bg-akili-coral-50', border: 'border-akili-coral-100' },
  warning: { Icon: AlertTriangle,  color: 'text-akili-warning', bg: 'bg-amber-50',    border: 'border-amber-200' },
  info:    { Icon: Info,           color: 'text-akili-indigo',  bg: 'bg-akili-indigo-50', border: 'border-akili-indigo-100' },
};

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((opts) => {
    const id = ++idCounter;
    const item = {
      id,
      type: opts.type || 'info',
      title: opts.title || '',
      description: opts.description || null,
      duration: opts.duration ?? 4000,
    };
    setToasts((prev) => [...prev, item]);
    if (item.duration > 0) {
      setTimeout(() => dismiss(id), item.duration);
    }
    return id;
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {createPortal(
        <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
          <AnimatePresence>
            {toasts.map((t) => {
              const cfg = TYPES[t.type];
              return (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 32 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className={cn(
                    'pointer-events-auto bg-white border rounded-akili shadow-akili-lg flex items-start gap-3 p-3.5',
                    cfg.border
                  )}
                  role="status"
                  aria-live="polite"
                >
                  <span className={cn('shrink-0 w-7 h-7 rounded-md flex items-center justify-center', cfg.bg, cfg.color)}>
                    <cfg.Icon size={16} strokeWidth={2.25} />
                  </span>
                  <div className="flex-1 min-w-0">
                    {t.title && (
                      <div className="font-display font-bold text-sm text-akili-charbon">
                        {t.title}
                      </div>
                    )}
                    {t.description && (
                      <div className="font-sans text-xs text-akili-charbon-soft mt-0.5 leading-relaxed">
                        {t.description}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => dismiss(t.id)}
                    aria-label="Fermer"
                    className="shrink-0 w-6 h-6 rounded text-akili-charbon-mute hover:text-akili-charbon hover:bg-akili-papyrus-deep flex items-center justify-center"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast doit être utilisé dans <ToastProvider>');
  return ctx;
}

/**
 * Modal — Overlay modal avec backdrop blur + animation Framer.
 * Bouton ESC pour fermer, click outside pour fermer.
 */
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  className,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-akili-indigo/70 backdrop-blur-sm"
          />

          {/* Panel */}
          <div className="relative flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className={cn(
                'relative bg-white border border-akili-line rounded-akili shadow-akili-xl w-full',
                sizes[size],
                className
              )}
            >
              {/* Header */}
              {(title || onClose) && (
                <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-akili-line">
                  <div className="flex-1 min-w-0">
                    {title && (
                      <h3 className="font-display font-extrabold text-2xl tracking-[-0.02em] text-akili-charbon">
                        {title}
                      </h3>
                    )}
                    {description && (
                      <p className="font-sans text-sm text-akili-charbon-soft mt-1.5 leading-relaxed">
                        {description}
                      </p>
                    )}
                  </div>
                  {onClose && (
                    <button
                      onClick={onClose}
                      aria-label="Fermer"
                      className="shrink-0 w-9 h-9 rounded-akili text-akili-charbon-soft hover:bg-akili-papyrus-deep transition-colors flex items-center justify-center"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              )}

              {/* Body */}
              <div className="px-6 py-6">{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

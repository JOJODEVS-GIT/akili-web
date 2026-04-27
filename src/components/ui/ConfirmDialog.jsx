/**
 * ConfirmDialog — confirmation modale pour actions destructives.
 *
 * Usage avec hook :
 *   const confirm = useConfirm();
 *   const ok = await confirm({ title: 'Supprimer ?', danger: true });
 */
import { useState, createContext, useContext, useCallback } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

const ConfirmContext = createContext(null);

export function ConfirmProvider({ children }) {
  const [state, setState] = useState({ isOpen: false });
  const [resolver, setResolver] = useState(null);

  const confirm = useCallback((opts = {}) => {
    return new Promise((resolve) => {
      setState({
        isOpen: true,
        title: opts.title || 'Confirmer cette action ?',
        description: opts.description || '',
        confirmLabel: opts.confirmLabel || 'Confirmer',
        cancelLabel: opts.cancelLabel || 'Annuler',
        danger: opts.danger || false,
      });
      setResolver(() => resolve);
    });
  }, []);

  const close = (result) => {
    setState((s) => ({ ...s, isOpen: false }));
    if (resolver) resolver(result);
    setResolver(null);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <Modal
        isOpen={state.isOpen}
        onClose={() => close(false)}
        title={state.title}
        description={state.description}
        size="sm"
      >
        <div className="flex justify-end gap-3 mt-2">
          <Button variant="ghost" onClick={() => close(false)}>
            {state.cancelLabel}
          </Button>
          <Button
            variant={state.danger ? 'primary' : 'secondary'}
            onClick={() => close(true)}
            className={state.danger ? '!bg-akili-error hover:!bg-[#A82C24]' : ''}
          >
            {state.confirmLabel}
          </Button>
        </div>
      </Modal>
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm doit être utilisé dans <ConfirmProvider>');
  return ctx;
}

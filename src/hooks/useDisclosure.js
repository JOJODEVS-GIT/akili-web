/**
 * useDisclosure — gère un state booléen ouvert/fermé.
 * Usage : const { isOpen, open, close, toggle } = useDisclosure();
 */
import { useCallback, useState } from 'react';

export function useDisclosure(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return { isOpen, open, close, toggle, setIsOpen };
}

import { useEffect, useState } from "react";

export const useDrawerState = (defaultOpen?: boolean) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  function onToggle(value: boolean) {
    setIsOpen(value);
  }

  useEffect(() => {
    if (defaultOpen && !isOpen) {
      setIsOpen(true);
    }
  }, [defaultOpen, isOpen]);

  return {
    onToggle,
    onOpen,
    onClose,
    isOpen,
  };
};

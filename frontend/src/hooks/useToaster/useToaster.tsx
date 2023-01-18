import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type Props = {
  message?: string;
  showToaster: (message: string, options?: ToasterOptions) => void;
};

type ToasterOptions = {
  duration?: number;
};

type StrictToasterOptions = Required<ToasterOptions>;

const DEFAULT_TOASTER_OPTIONS: StrictToasterOptions = {
  duration: 4500,
};

const ToasterContext = createContext<Props | null>(null);

export const ToasterProvider = ({ children }: PropsWithChildren) => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [options, setOptions] = useState<StrictToasterOptions>(DEFAULT_TOASTER_OPTIONS);

  const showToaster = (message: string, options?: ToasterOptions) => {
    setOptions({ ...DEFAULT_TOASTER_OPTIONS, ...options });
    setMessage(message);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(undefined);
    }, options.duration);

    return () => clearTimeout(timer);
  }, [message, options]);

  const value = { message, showToaster };
  return <ToasterContext.Provider value={value}>{children}</ToasterContext.Provider>;
};

export const useToaster = (): Props => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster must be used within an ToasterProvider");
  }
  return context;
};

import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type Props = {
  message: string;
  isError: boolean;
  visible: boolean;
  showToaster: (message: string, options?: ToasterOptions) => void;
};

type ToasterOptions = {
  duration?: number;
  isError?: boolean;
};

type StrictToasterOptions = Required<ToasterOptions>;

const DEFAULT_TOASTER_OPTIONS: StrictToasterOptions = {
  duration: 6000,
  isError: false,
};

const ToasterContext = createContext<Props | null>(null);

export const ToasterProvider = ({ children }: PropsWithChildren) => {
  const [message, setMessage] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<StrictToasterOptions>(DEFAULT_TOASTER_OPTIONS);

  const showToaster = (message: string, options?: ToasterOptions) => {
    setOptions({ ...DEFAULT_TOASTER_OPTIONS, ...options });
    setMessage(message);
    setVisible(true);
  };

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, options.duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const value = { message, visible, isError: options.isError, showToaster };
  return <ToasterContext.Provider value={value}>{children}</ToasterContext.Provider>;
};

export const useToaster = (): Props => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster must be used within an ToasterProvider");
  }
  return context;
};

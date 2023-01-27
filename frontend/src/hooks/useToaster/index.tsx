import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

type Toaster = {
  message: string;
  isError: boolean;
  visible: boolean;
};

type ShowToaster = (message: string, options?: ShowToasterOptions) => void;

type ShowToasterOptions = {
  duration?: number;
  isError?: boolean;
};

type StrictShowToasterOptions = Required<ShowToasterOptions>;

const DEFAULT_TOASTER_OPTIONS: StrictShowToasterOptions = {
  duration: 6000,
  isError: false,
};

const ToasterContext = createContext<Toaster | null>(null);
const ShowToasterContext = createContext<ShowToaster | null>(null);

export const ToasterProvider = ({ children }: PropsWithChildren) => {
  const [message, setMessage] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<StrictShowToasterOptions>(DEFAULT_TOASTER_OPTIONS);

  const showToaster = useMemo(
    () => (message: string, options?: ShowToasterOptions) => {
      setOptions({ ...DEFAULT_TOASTER_OPTIONS, ...options });
      setMessage(message);
      setVisible(true);
    },
    []
  );

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, options.duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <ToasterContext.Provider value={{ message, visible, isError: options.isError }}>
      <ShowToasterContext.Provider value={showToaster}>{children}</ShowToasterContext.Provider>
    </ToasterContext.Provider>
  );
};

export const useToaster = (): Toaster => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster must be used within an ToasterProvider");
  }
  return context;
};

export const useShowToaster = (): ShowToaster => {
  const context = useContext(ShowToasterContext);
  if (!context) {
    throw new Error("useShowToaster must be used within an ToasterProvider");
  }
  return context;
};

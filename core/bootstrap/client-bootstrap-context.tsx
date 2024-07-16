import { bootstrap } from "core/bootstrap/index";
import { AuthProvider } from "core/infrastructure/marketplace-api-client-adapter/auth/auth-provider";
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";

interface ClientBootstrap {
  authProvider?: AuthProvider;
}

const initialClientBootstrap: ClientBootstrap = {
  authProvider: bootstrap.getAuthProvider(),
};

const ClientBootstrapContext = createContext<{
  clientBootstrap: ClientBootstrap;
  setClientBootstrap: Dispatch<SetStateAction<ClientBootstrap>>;
}>({
  clientBootstrap: initialClientBootstrap,
  setClientBootstrap: () => {},
});

export function ClientBootstrapProvider({ children }: PropsWithChildren) {
  const [clientBootstrap, setClientBootstrap] = useState(initialClientBootstrap);

  return (
    <ClientBootstrapContext.Provider value={{ clientBootstrap, setClientBootstrap }}>
      {children}
    </ClientBootstrapContext.Provider>
  );
}

export function useClientBootstrapContext() {
  return useContext(ClientBootstrapContext);
}

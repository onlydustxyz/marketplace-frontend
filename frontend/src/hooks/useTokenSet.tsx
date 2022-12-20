import { createContext, PropsWithChildren, useContext } from "react";
import { useLocalStorage } from "react-use";
import { TokenSet } from "src/types";

export const LOCAL_STORAGE_TOKEN_SET_KEY = "hasura_token";

type TokenSetContextType = {
  tokenSet?: TokenSet | null;
  setTokenSet: (tokenSet: TokenSet) => void;
};

const TokenSetContext = createContext<TokenSetContextType | null>(null);

export const TokenSetProvider = ({ children }: PropsWithChildren) => {
  const [tokenSet, setTokenSet] = useLocalStorage<TokenSet | null>(LOCAL_STORAGE_TOKEN_SET_KEY);

  return <TokenSetContext.Provider value={{ tokenSet, setTokenSet }}>{children}</TokenSetContext.Provider>;
};

export const useTokenSet = (): TokenSetContextType => {
  const context = useContext(TokenSetContext);
  if (!context) {
    throw new Error("useTokenSet must be used within an TokenSetProvider");
  }
  return context;
};

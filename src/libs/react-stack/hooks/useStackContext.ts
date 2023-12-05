import { useContext } from "react";
import { ReactStackContext } from "../context/stack.context";

export const useStackContext = () => {
  const context = useContext(ReactStackContext);

  if (!context) {
    throw new Error("UseStackContext must be used within a provider");
  }

  return context;
};

export default useStackContext;

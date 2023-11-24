import { useContext } from "react";
import { ReactStackContext } from "../reactStackContext";

const UseStackContext = () => {
  const context = useContext(ReactStackContext);

  if (!context) {
    throw new Error("UseStackContext must be used within a provider");
  }

  return context;
};

export default UseStackContext;

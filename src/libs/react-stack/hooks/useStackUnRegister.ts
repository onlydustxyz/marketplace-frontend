import useStackContext from "./useStackContext";

/**
 * Custom hook for un registering a stack.
 */
export const useStackUnRegister = () => {
  const {
    stackMethods: { unRegister },
  } = useStackContext();

  return unRegister;
};

export default useStackUnRegister;

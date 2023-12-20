import useStackContext from "./useStackContext";

/**
 * Close all active stacks
 */
export const useCloseAllStack = () => {
  const {
    stackMethods: { closeAll },
  } = useStackContext();

  return closeAll;
};

export default useCloseAllStack;

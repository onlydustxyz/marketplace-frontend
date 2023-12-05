import useStackContext from "./useStackContext";

/**
 * Close stacks
 */
export const useCloseStack = () => {
  const {
    stackMethods: { close },
  } = useStackContext();

  return close;
};

export default useCloseStack;

import useStackContext from "./useStackContext";

export interface StackOpenFunction {
  (name: string, params?: object): void;
}

/**
 * Open with name and params a stack.
 * @returns {StackOpenFunction} The function to open a stack.
 */
export const useOpenStack = (): StackOpenFunction => {
  const {
    stackMethods: { open },
  } = useStackContext();

  return (name: string, params?: object) => {
    open(name, params);
  };
};

export default useOpenStack;

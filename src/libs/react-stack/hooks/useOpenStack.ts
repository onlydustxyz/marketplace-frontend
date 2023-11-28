import useStackContext from "./useStackContext";

export interface StackOpenFunction {
  (name: string, params?: object): void;
}

export const useOpenStack = (): StackOpenFunction => {
  const {
    stackMethods: { open },
  } = useStackContext();

  return (name: string, params?: object) => {
    open(name, params);
  };
};

export default useOpenStack;

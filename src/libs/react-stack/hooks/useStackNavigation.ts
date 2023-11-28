import useStackContext from "./useStackContext";

export interface StackNavigateFunction {
  (name: string, params?: object): void;
}

const useStackNavigation = (): StackNavigateFunction => {
  const {
    stackMethods: { open },
  } = useStackContext();

  return (name: string, params?: object) => {
    open(name, params);
  };
};

export default useStackNavigation;

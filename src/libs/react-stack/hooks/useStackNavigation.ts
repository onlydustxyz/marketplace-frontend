import { StacksParams } from "../types/Stack";
import useStackContext from "./useStackContext";

export interface StackNavigateFunction<P extends StacksParams> {
  (params?: P): void;
}

export const useStackNavigation = <P extends StacksParams>(name: string): StackNavigateFunction<P> => {
  const {
    stackMethods: { open },
  } = useStackContext();

  return (params?: P) => {
    open(name, params);
  };
};

export default useStackNavigation;

import { StacksParams } from "../types/Stack";
import useStackContext from "./useStackContext";

export interface StackNavigateFunction<P extends StacksParams> {
  (params?: P): void;
}

export const useStackNavigation = <P extends StacksParams>(
  name: string
): [StackNavigateFunction<P>, (id?: string) => void] => {
  const {
    stackMethods: { open, close },
  } = useStackContext();

  return [
    (params?: P) => {
      open(name, params);
    },
    (panelId?: string) => {
      close(name, panelId);
    },
  ];
};

export default useStackNavigation;

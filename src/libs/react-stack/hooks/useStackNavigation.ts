import { StacksParams } from "../types/Stack";
import useStackContext from "./useStackContext";

export interface StackNavigateFunction<P extends StacksParams> {
  (params?: P): void;
}

/**
 * Custom hook for stack navigation.
 *
 * @views P - The type of the stack parameters.
 * @param {string} name - The name of the stack.
 * @returns {[StackNavigateFunction<P>, (id?: string) => void]} - An array containing the stack navigate function and the close function.
 */
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

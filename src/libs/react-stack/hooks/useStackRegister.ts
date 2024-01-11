import { useEffect } from "react";

import { RegisterStackProps, StackInterface, StackPanelInterface, StacksParams } from "../types/Stack";
import { useRefSubscription } from "../../react-subscriber/useRefSubscription";
import { v4 as uuidv4 } from "uuid";
import useStackContext from "./useStackContext";

/**
 * Custom hook for registering a stack.
 * @template P - The type of the stack parameters.
 * @param {RegisterStackProps<P>} props - The props for registering the stack.
 * @returns {StackInterface<P>} - The registered stack.
 */
export const useStackRegister = <P extends StacksParams>({ unRegisterOnUnMount, ...props }: RegisterStackProps<P>) => {
  const {
    stackMethods: { register, getStack, unRegister },
  } = useStackContext();

  const [templatePanel] = useRefSubscription<StackPanelInterface<P>>({
    open: false,
    position: "hidden",
    id: uuidv4(),
    params: {} as P,
    ...props,
  });
  const [panel] = useRefSubscription<StackPanelInterface<P>>({
    open: false,
    position: "hidden",
    id: uuidv4(),
    params: {} as P,
    ...props,
  });

  const [stack] = useRefSubscription<StackInterface<P>>({
    open: false,
    position: "hidden",
    defaultPanel: templatePanel,
    defaultPanelId: panel.state.id,
    panels: {
      [panel.state.id]: panel,
    },
    ...props,
  });

  /** register modal if not exist */
  useEffect(() => {
    if (!getStack(stack.state.name)) {
      register(stack);
    }
  }, [stack]);

  /** un register on unMount */
  useEffect(() => {
    return () => {
      if (unRegisterOnUnMount) {
        unRegister(props.name);
      }
    };
  }, [stack]);

  return getStack(stack.state.name) || stack;
};

export default useStackRegister;

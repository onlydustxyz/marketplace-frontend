import { useSubscribe } from "src/libs/react-subscriber";

import useStackContext from "./useStackContext";

/**
 * Custom hook for subscribe to a panel state.
 *
 * @param {string} name - The name of the stack.
 * @returns {open: boolean} - the current open state of the panel.
 */
export const useSubscribeStacks = (name: string): { open: boolean } => {
  const {
    stackMethods: { getPanelFromStackName },
  } = useStackContext();

  const stack = getPanelFromStackName(name);
  const subscribe = useSubscribe(stack?.panel || undefined);

  return {
    open: subscribe?.open || false,
  };
};

export default useSubscribeStacks;

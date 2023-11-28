import { useEffect } from "react";
import { RegisterStackProps } from "../types/RegisterStack";
import UseStackContext from "./useStackContext";
import { StackInterface, StackPanelInterface, StacksParams } from "../types/Stack";
import { useRefSubscription } from "../../react-subscriber/useRefSubscription";
import { v4 as uuidv4 } from "uuid";

const useStackRegister = <P extends StacksParams>(props: RegisterStackProps<P>) => {
  const {
    stackMethods: { register, getStack },
  } = UseStackContext();
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

  return stack;
};

export default useStackRegister;

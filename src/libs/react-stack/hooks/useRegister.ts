import { useEffect } from "react";
import { RegisterStackProps } from "../types/RegisterStack";
import UseStackContext from "./useStackContext";
import { StackInterface, StackPanelInterface } from "../types/Stack";
import { useRefSubscription } from "../../react-subscriber/useRefSubscription";
import { v4 as uuidv4 } from "uuid";

const UseRegister = (props: RegisterStackProps) => {
  const {
    stackMethods: { register, getStack },
  } = UseStackContext();
  const [templatePanel] = useRefSubscription<StackPanelInterface>({
    open: false,
    position: "hidden",
    id: uuidv4(),
    ...props,
  });
  const [panel] = useRefSubscription<StackPanelInterface>({
    open: false,
    position: "hidden",
    id: uuidv4(),
    ...props,
  });

  const [stack] = useRefSubscription<StackInterface>({
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

export default UseRegister;

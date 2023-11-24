import { useEffect } from "react";
import { RegisterStackProps } from "../types/RegisterStack";
import UseStackContext from "./useStackContext";
import { StackInterface } from "../types/Stack";
import { useRefSubscription } from "../../react-subscriber/useRefSubscription";
import { v4 as uuidv4 } from "uuid";

const UseRegister = (props: RegisterStackProps) => {
  const {
    stackMethods: { register, get },
  } = UseStackContext();
  const [stackStacks] = useRefSubscription<StackInterface>({
    open: false,
    position: "hidden",
    stacks: {},
    ...props,
  });
  const [stack] = useRefSubscription<StackInterface>({
    open: false,
    position: "hidden",
    stacks: {},
    ...props,
  });

  /** register modal if not exist */
  useEffect(() => {
    if (!get(stack.state.name)) {
      stack.state.stacks = {
        [uuidv4()]: stackStacks,
      };
      register(stack);
    }
  }, [stack]);

  return stack;
};

export default UseRegister;

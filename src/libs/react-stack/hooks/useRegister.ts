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
    defaultStack: "",
    ...props,
  });
  const [stack] = useRefSubscription<StackInterface>({
    open: false,
    position: "hidden",
    stacks: {},
    defaultStack: "",
    ...props,
  });

  /** register modal if not exist */
  useEffect(() => {
    if (!get(stack.state.name)) {
      const id = uuidv4();
      stack.state.defaultStack = id;
      stack.state.stacks = {
        [id]: stackStacks,
      };
      register(stack);
    }
  }, [stack]);

  return stack;
};

export default UseRegister;

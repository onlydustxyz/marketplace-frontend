import { useEffect } from "react";
import { RegisterStackProps } from "../types/RegisterStack";
import UseStackContext from "./useStackContext";
import { StackInterface } from "../types/Stack";
import { useRefSubscription } from "../../react-subscriber/useRefSubscription";

const UseRegister = (props: RegisterStackProps) => {
  const {
    stackMethods: { register, get },
  } = UseStackContext();
  const [stack] = useRefSubscription<StackInterface>({
    open: false,
    position: "hidden",
    ...props,
  });

  /** register modal if not exist */
  useEffect(() => {
    if (!get(stack.state.name)) {
      register(stack);
    }
  }, [stack]);

  return stack;
};

export default UseRegister;

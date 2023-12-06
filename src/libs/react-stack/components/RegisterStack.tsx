import useStackRegister from "../hooks/useStackRegister";

import { RegisterStackProps, StacksParams } from "../types/Stack";
import { Stack } from "./Stack";

export function RegisterStack<P extends StacksParams>(
  props: RegisterStackProps<P> & { unRegisterOnUnMount?: boolean }
) {
  const ref = useStackRegister(props);

  return <Stack stackRef={ref} />;
}

import useStackRegister from "../hooks/useStackRegister";

import { RegisterStackProps, StacksParams } from "../types/Stack";
import { Stack } from "./Stack";

export function RegisterStack<P extends StacksParams>(props: RegisterStackProps<P>) {
  const ref = useStackRegister(props);

  return <Stack stackRef={ref} />;
}

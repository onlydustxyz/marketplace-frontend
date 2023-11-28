import useStackRegister from "../hooks/useStackRegister";
import { RegisterStackProps } from "../types/RegisterStack";
import { StacksParams } from "../types/Stack";
import { Stack } from "./Stack";

export default function RegisterStack<P extends StacksParams>(props: RegisterStackProps<P>) {
  const ref = useStackRegister(props);

  return <Stack stackRef={ref} />;
}

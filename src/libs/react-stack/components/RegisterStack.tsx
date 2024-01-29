import useStackRegister from "../hooks/useStackRegister";
import { Options, RegisterStackProps, StacksParams } from "../types/Stack";
import { Stack } from "./Stack";

export function RegisterStack<P extends StacksParams>({
  option,
  ...props
}: RegisterStackProps<P> & { option?: Options }) {
  const ref = useStackRegister(props);

  return <Stack stackRef={ref} option={option} />;
}

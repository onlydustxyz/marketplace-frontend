import UseRegister from "../hooks/useRegister";
import { RegisterStackProps } from "../types/RegisterStack";
import { Stack } from "./Stack";

export default function Register(props: RegisterStackProps) {
  const ref = UseRegister(props);

  return (
    <>
      <Stack stackRef={ref} />
    </>
  );
}

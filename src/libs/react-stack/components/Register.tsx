import UseRegister from "../hooks/useRegister";
import { RegisterStackProps } from "../types/RegisterStack";
import StackPanel from "./StackPanel";

export default function Register(props: RegisterStackProps) {
  UseRegister(props);

  return (
    <>
      <StackPanel name={props.name} />
    </>
  );
}

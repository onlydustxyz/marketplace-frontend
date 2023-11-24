import UseRegister from "../hooks/useRegister";
import { RegisterStackProps } from "../types/RegisterStack";
import { Modal } from "./Modal";

export default function Register(props: RegisterStackProps) {
  UseRegister(props);

  return <Modal name={props.name} />;
}

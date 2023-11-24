import UseRegister from "../hooks/useRegister";
import { RegisterStackProps } from "../types/RegisterStack";
import UseController from "../hooks/useController";

export default function Register(props: RegisterStackProps) {
  UseRegister(props);
  const { open, close } = UseController({ name: props.name });

  return (
    <div className="border border-blue-300 p-2">
      {props.name}
      <div>
        <button onClick={open}>open</button>
      </div>
      <div>
        <button onClick={close}>close</button>
      </div>
      {/* <div>Name : {modale?.name}</div> */}
      {/* <div>IsOpen {modale?.open ? 'Oui' : 'Non'}</div> */}
    </div>
  );
}

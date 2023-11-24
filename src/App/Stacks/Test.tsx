import { Button } from "react-day-picker";
import UseController from "src/libs/react-stack/hooks/useController";

export const TestStack = () => {
  const { open, close } = UseController({ name: "modal-1" });

  return <Button onClick={() => open}>open panel1</Button>;
};

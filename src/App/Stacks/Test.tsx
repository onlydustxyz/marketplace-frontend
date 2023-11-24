import Button from "src/components/Button";
import UseController from "src/libs/react-stack/hooks/useController";

export const TestStack = () => {
  const { open, close } = UseController({ name: "modal-1" });

  return (
    <>
      <Button onClick={open}>open panel1</Button>
      <Button onClick={close}>close panel1</Button>
    </>
  );
};

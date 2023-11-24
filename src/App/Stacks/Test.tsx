import Button, { ButtonSize } from "src/components/Button";
import UseController from "src/libs/react-stack/hooks/useController";

export const TestStack = () => {
  const { open, close } = UseController({ name: "modal-1" });
  const { open: open2, close: close2 } = UseController({ name: "modal-2" });

  return (
    <>
      <h2>Panel 1</h2>
      <Button size={ButtonSize.Xs} onClick={open}>
        open panel1
      </Button>
      <Button size={ButtonSize.Xs} onClick={close}>
        close panel1
      </Button>
      <h2>Panel 2</h2>
      <Button size={ButtonSize.Xs} onClick={open2}>
        open panel2
      </Button>
      <Button size={ButtonSize.Xs} onClick={close2}>
        close panel2
      </Button>
    </>
  );
};

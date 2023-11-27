import Button, { ButtonSize } from "src/components/Button";
import UseController from "src/libs/react-stack/hooks/useController";

export const TestStack = () => {
  const { open, close } = UseController({ name: "modal-1" });
  const { open: open2, close: close2 } = UseController({ name: "modal-2" });
  const { open: open3, close: close3 } = UseController({ name: "modal-3" });

  return (
    <div className="flex flex-row gap-2">
      <Button size={ButtonSize.Xs} onClick={() => open({ id: 11 })}>
        open me
      </Button>
      <Button size={ButtonSize.Xs} onClick={() => open({ id: 11 })}>
        open mehdi
      </Button>
      <Button size={ButtonSize.Xs} onClick={() => open({ id: 11 })}>
        open Pierre
      </Button>
      <Button size={ButtonSize.Xs} onClick={open2}>
        open panel2
      </Button>
      <Button size={ButtonSize.Xs} onClick={open3}>
        open panel3
      </Button>
    </div>
  );
};

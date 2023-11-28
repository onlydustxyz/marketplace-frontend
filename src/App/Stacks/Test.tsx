import Button, { ButtonSize } from "src/components/Button";
import UseController from "src/libs/react-stack/hooks/useStackController";
import useStackNavigation from "src/libs/react-stack/hooks/useStackNavigation";
import { StackRoute } from "./Stacks";

export const TestStack = () => {
  const { open, close } = UseController({ name: "modal-1" });
  const { open: open2, close: close2 } = UseController({ name: "modal-2" });
  const { open: open3, close: close3 } = UseController({ name: "modal-3" });
  const navigateStack = useStackNavigation();

  return (
    <div className="flex flex-row gap-2">
      <Button size={ButtonSize.Xs} onClick={() => navigateStack(StackRoute.modal1, { githubUserId: 17259618 })}>
        open me
      </Button>
      <Button size={ButtonSize.Xs} onClick={() => navigateStack(StackRoute.modal1, { githubUserId: 143011364 })}>
        open mehdi
      </Button>
      <Button size={ButtonSize.Xs} onClick={() => navigateStack(StackRoute.modal1, { githubUserId: 16590657 })}>
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

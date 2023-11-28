import Button, { ButtonSize } from "src/components/Button";

import { StackRoute, StackRouterParams } from "./Stacks";
import { useStackController, useStackNavigation } from "src/libs/react-stack";

export const TestStack = () => {
  const { open: open2, close: close2 } = useStackController({ name: "modal-2" });
  const { open: open3, close: close3 } = useStackController({ name: "modal-3" });
  const [navigateStack] = useStackNavigation<StackRouterParams["modal1"]>(StackRoute.modal1);

  return (
    <div className="flex flex-row gap-2">
      <Button size={ButtonSize.Xs} onClick={() => navigateStack({ githubUserId: 17259618 })}>
        open me
      </Button>
      <Button size={ButtonSize.Xs} onClick={() => navigateStack({ githubUserId: 143011364 })}>
        open mehdi
      </Button>
      <Button size={ButtonSize.Xs} onClick={() => navigateStack({ githubUserId: 16590657 })}>
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

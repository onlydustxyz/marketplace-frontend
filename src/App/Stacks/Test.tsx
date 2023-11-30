import Button, { ButtonSize } from "src/components/Button";

import { StackRoute, StackRouterParams } from "./Stacks";
import { useStackNavigation } from "src/libs/react-stack";

export const TestStack = () => {
  const [navigateStack] = useStackNavigation<StackRouterParams["modal1"]>(StackRoute.modal1);
  const [navigateStack2] = useStackNavigation(StackRoute.modal2);
  const [navigateStack3] = useStackNavigation(StackRoute.modal3);

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
      <Button size={ButtonSize.Xs} onClick={navigateStack2}>
        open panel2
      </Button>
      <Button size={ButtonSize.Xs} onClick={navigateStack3}>
        open panel3
      </Button>
    </div>
  );
};

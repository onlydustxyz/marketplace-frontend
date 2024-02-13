import { cn } from "src/utils/cn";

import { usePlacement } from "../hooks/usePlacement";

export const BackDrop = ({ onClick }: { onClick: () => void }) => {
  const { placement } = usePlacement();
  return (
    <div
      onClick={onClick}
      className={cn("fixed left-0 top-0 z-[2] h-screen w-screen", placement === "bottom" && "bg-greyscale-900/50")}
    ></div>
  );
};

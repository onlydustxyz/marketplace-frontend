import { PropsWithChildren } from "react";
import { cn } from "src/utils/cn";

type Props = PropsWithChildren<{
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  rewardId?: string;
}>;

export default function Line({ className, children, onClick, selected, rewardId }: Props) {
  return (
    <tr
      data-reward-id={rewardId}
      data-testid="reward-line"
      className={cn(
        "border-b border-gray-800 outline-offset-0 transition duration-200 hover:bg-white/5 hover:outline-2",
        {
          "cursor-pointer": !!onClick,
          "bg-white/5 outline-2": selected,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

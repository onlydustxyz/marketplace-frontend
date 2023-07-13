import classNames from "classnames";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  rewardId?: string;
}

const Line: React.FC<Props> = ({ className, children, onClick, selected, rewardId }) => {
  return (
    <tr
      data-reward-id={rewardId}
      data-testid="reward-line"
      className={classNames(
        `group/line border-b border-gray-800 ${className}`,
        "outline-offset-0 transition duration-200 hover:bg-white/5 hover:outline-2",
        {
          "cursor-pointer": !!onClick,
          "bg-white/5 outline-2": selected,
        }
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export default Line;

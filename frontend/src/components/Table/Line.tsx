import classNames from "classnames";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
  highlightOnHover?: number;
}

const Line: React.FC<Props> = ({ className, children, onClick, highlightOnHover }) => {
  return (
    <tr
      className={classNames(`group/line border-b border-gray-800 ${className}`, {
        "transition duration-200 hover:bg-white/5 outline-offset-0 hover:outline-2": highlightOnHover,
        "cursor-pointer": !!onClick,
      })}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export default Line;

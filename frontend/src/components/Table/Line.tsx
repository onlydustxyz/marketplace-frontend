import classNames from "classnames";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
  clickable?: boolean;
  highlightOnHover?: number;
}

const Line: React.FC<Props> = ({ className, children, highlightOnHover }) => {
  return (
    <tr
      className={classNames(`group/line border-b border-gray-800 ${className}`, {
        "transition duration-200 hover:bg-white/5 outline-offset-0 hover:outline-2": highlightOnHover,
      })}
    >
      {children}
    </tr>
  );
};

export default Line;

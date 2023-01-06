import { PropsWithChildren } from "react";
import { linkClickHandlerFactory } from "src/utils/clickHandler";

interface Props extends PropsWithChildren {
  className?: string;
  clickable?: boolean;
  link?: string;
}

const Line: React.FC<Props> = ({ className, children, link }) => {
  return (
    <tr
      onClick={link ? linkClickHandlerFactory(link) : undefined}
      className={`group/line border-b border-gray-800 ${link && "hover:bg-white/5"} ${className}`}
    >
      {children}
    </tr>
  );
};

export default Line;

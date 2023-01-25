import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
  clickable?: boolean;
  highlightOnHover?: number;
}

const Line: React.FC<Props> = ({ className, children, highlightOnHover }) => {
  return (
    <tr
      className={`group/line border-b border-gray-800
        ${
          highlightOnHover &&
          `transition duration-${highlightOnHover} hover:bg-white/4 outline-offset-0 hover:outline-2`
        }
        ${className}`}
    >
      {children}
    </tr>
  );
};

export default Line;

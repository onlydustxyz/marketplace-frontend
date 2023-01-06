import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export const HeaderCell: React.FC<Props> = ({ className, children }) => {
  return (
    <th scope="col" className={`text-left h-full ${className}`}>
      <div className="h-4 mb-2 flex items-center space-x-1">{children}</div>
    </th>
  );
};

export default HeaderCell;

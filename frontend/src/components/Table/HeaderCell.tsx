import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export const HeaderCell: React.FC<Props> = ({ className, children }) => {
  return (
    <th scope="col" className={`px-6 py-4 text-left ${className}`}>
      {children}
    </th>
  );
};

export default HeaderCell;

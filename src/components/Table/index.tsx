import { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  id: string;
  headers: ReactNode;
}

const Table: React.FC<Props> = ({ id, headers, children }) => {
  return (
    <div className="px-2">
      <table id={id} className="w-full table-fixed font-walsheim text-sm font-medium leading-4 text-gray-100">
        <thead className="border-b border-gray-800 text-gray-400">{headers}</thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;

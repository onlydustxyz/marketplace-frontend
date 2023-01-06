import { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  id: string;
  headers: ReactNode;
}

const Table: React.FC<Props> = ({ id, headers, children }) => {
  return (
    <div className="px-4 mx-4">
      <table id={id} className="table-fixed w-full text-gray-100 text-sm font-medium font-walsheim">
        <thead className="border-b text-gray-400 fill-gray-400 border-neutral-600">{headers}</thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;

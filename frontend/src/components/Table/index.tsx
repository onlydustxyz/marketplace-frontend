import { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  id: string;
  headers: ReactNode;
}

const Table: React.FC<Props> = ({ id, headers, children }) => {
  return (
    <div className="px-4 mx-4">
      <table id={id} className="table-fixed w-full text-white text-sm font-medium font-walsheim">
        <thead className="border-b text-neutral-300 border-neutral-600">{headers}</thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;

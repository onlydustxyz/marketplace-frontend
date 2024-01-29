import { PropsWithChildren, ReactNode } from "react";

import { cn } from "src/utils/cn";

interface Props extends PropsWithChildren {
  id: string;
  headers: ReactNode;
  emptyFallback?: ReactNode;
  theadClassName?: string;
}

const Table: React.FC<Props> = ({ id, headers, children, theadClassName, emptyFallback }) => {
  return (
    <div className="px-2">
      <table id={id} className="w-full table-fixed font-walsheim text-sm font-medium leading-4 text-gray-100">
        <thead className={cn("border-b border-gray-800 text-gray-400", theadClassName)}>{headers}</thead>
        <tbody>{children}</tbody>
      </table>
      {emptyFallback ? emptyFallback : null}
    </div>
  );
};

export default Table;

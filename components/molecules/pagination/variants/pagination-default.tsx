import { ElementType } from "react";

import { PaginationCore } from "../pagination.core";
import { TPaginationProps } from "../pagination.types";

export function Pagination<C extends ElementType = "div">({ ...props }: TPaginationProps<C>) {
  return <PaginationCore {...props} classNames={{}} />;
}

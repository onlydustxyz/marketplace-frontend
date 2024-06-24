import { PaginationCore } from "../pagination.core";
import { TPaginationProps } from "../pagination.types";
import { ElementType } from "react";

export function Pagination<C extends ElementType = "div">({
  ...props
}: TPaginationProps<C>) {
  return <PaginationCore {...props} classNames={{}} />;
}

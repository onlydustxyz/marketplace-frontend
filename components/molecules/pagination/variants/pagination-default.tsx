import { ElementType } from "react";

import { withComponentAdapter } from "components/hocs/with-component-adapter";
import { PaginationDefaultAdapter } from "components/molecules/pagination/adapters/default/default.adapter";

import { PaginationPort } from "../pagination.types";

export function Pagination<C extends ElementType = "div">(props: PaginationPort<C>) {
  return withComponentAdapter<PaginationPort<C>>(PaginationDefaultAdapter)(props);
}

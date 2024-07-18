import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { BreadcrumbsDefaultAdapter } from "../adapters/default/default.adapter";
import { BreadcrumbsPort } from "../breadcrumbs.types";

export function Breadcrumbs(props: BreadcrumbsPort) {
  return withComponentAdapter(BreadcrumbsDefaultAdapter)(props);
}

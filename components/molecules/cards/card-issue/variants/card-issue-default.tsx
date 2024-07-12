import { CardIssueDefaultAdapter } from "../adapters/default/default.adapter";
import { CardIssuePort } from "../card-issue.types";
import { withComponentAdapter } from "components/hocs/with-component-adapter";
import { ElementType } from "react";

export function CardIssue<C extends ElementType = "div">(
  props: CardIssuePort<C>
) {
  return withComponentAdapter<CardIssuePort<C>>(CardIssueDefaultAdapter)(props);
}

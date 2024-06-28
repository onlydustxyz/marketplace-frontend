import { Badge } from "components/atoms/badge";
import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { AccordionItemProps, AccordionWithBadgePort } from "../accordion.types";
import { AccordionNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";

export function AccordionWithBadge({ items, ...props }: AccordionWithBadgePort) {
  const itemsWithBadge: AccordionItemProps[] = items.map(({ badgeProps, ...item }) => ({
    ...item,
    endContent: <Badge style="outline" size="s" {...badgeProps} />,
  }));

  return withComponentAdapter<AccordionWithBadgePort>(AccordionNextUiAdapter)({ ...props, items: itemsWithBadge });
}

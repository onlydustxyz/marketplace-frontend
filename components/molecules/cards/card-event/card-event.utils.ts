import { ComponentProps } from "react";

import { Button } from "components/atoms/button/variants/button-default";
import { Tag } from "components/atoms/tag";
import { CardEventStatus } from "components/molecules/cards/card-event/card-event.types";

export function getComponentsVariants(status: CardEventStatus): {
  buttonVariant: ComponentProps<typeof Button>["variant"];
  tagColor: ComponentProps<typeof Tag>["color"];
} {
  const map = {
    planned: {
      buttonVariant: "secondary-light",
      tagColor: "white",
    },
    terminated: {
      buttonVariant: "secondary-light",
      tagColor: "white",
    },
    highlight: {
      buttonVariant: "primary",
      tagColor: "white",
    },
  } as const;

  return map[status];
}

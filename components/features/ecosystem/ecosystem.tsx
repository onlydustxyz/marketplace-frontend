import { cn } from "src/utils/cn";

import { Avatar } from "components/ds/avatar/avatar";
import { TEcosystem } from "components/features/ecosystem/ecosystem.types";
import { Typography } from "components/layout/typography/typography";

export function Ecosystem({ name, logoUrl, clickable, className }: TEcosystem.Props) {
  const Component = clickable ? "button" : "div";
  return (
    <Component
      type={clickable ? "button" : undefined}
      className={cn("group flex flex-row items-center gap-1", className)}
    >
      <Avatar src={logoUrl} alt={name} size="xs" />

      <Typography
        variant="body-s"
        className={cn({
          "block truncate group-hover:text-spacePurple-300 group-hover:underline": clickable,
        })}
      >
        {name}
      </Typography>
    </Component>
  );
}

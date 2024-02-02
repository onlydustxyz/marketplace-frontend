import { cn } from "src/utils/cn";

import { Thumbnail } from "components/ds/thumbnail/thumbnail";
import { TEcosystem } from "components/features/ecosystem/ecosystem.types";
import { Typography } from "components/layout/typography/typography";

export function Ecosystem({ name, logoUrl, clickable, className }: TEcosystem.Props) {
  const Component = clickable ? "button" : "div";
  return (
    <Component
      type={clickable ? "button" : undefined}
      className={cn("group flex flex-row items-center gap-1", className)}
    >
      <Thumbnail src={logoUrl} alt={name} size="xs" type="ecosystem" />
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

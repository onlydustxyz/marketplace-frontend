import { cn } from "src/utils/cn";

import { TIconTag } from "components/ds/icon-tag/icon-tag.types";
import { iconTagVariants } from "components/ds/icon-tag/icon-tag.variants";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { Icon } from "components/layout/icon/icon";

export function IconTag({
  as: Component = "span",
  id,
  testId,
  className,
  onClick,
  icon,
  tooltipContent,
  ...props
}: TIconTag.Props) {
  if (tooltipContent) {
    return (
      <Tooltip content={tooltipContent} placement="top-end">
        <Component
          data-testid={testId}
          id={id}
          className={cn(iconTagVariants({ ...props }), className)}
          onClick={onClick}
        >
          <Icon {...icon} size={14} />
        </Component>
      </Tooltip>
    );
  }
  return (
    <Component data-testid={testId} id={id} className={cn(iconTagVariants({ ...props }), className)} onClick={onClick}>
      <Icon {...icon} size={14} />
    </Component>
  );
}

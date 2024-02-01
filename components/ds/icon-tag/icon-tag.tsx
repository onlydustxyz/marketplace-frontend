import { cn } from "src/utils/cn";

import { TIconTag } from "components/ds/icon-tag/icon-tag.types";
import { iconTagVariants } from "components/ds/icon-tag/icon-tag.variants";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { Icon } from "components/layout/icon/icon";

export function IconTag({ as: Component = "span", id, testId, className, onClick, ...props }: TIconTag.Props) {
  const { customName, remixName, tooltipContent } = props;
  if (tooltipContent) {
    return (
      <Tooltip {...props}>
        <Component
          data-testId={testId}
          id={id}
          className={cn(iconTagVariants({ ...props }), className)}
          onClick={onClick}
        >
          {customName ? <Icon customName={customName} size={16} /> : null}
          {remixName ? <Icon remixName={remixName} size={16} /> : null}
        </Component>
      </Tooltip>
    );
  }
  return (
    <Component data-testId={testId} id={id} className={cn(iconTagVariants({ ...props }), className)} onClick={onClick}>
      {customName ? <Icon customName={customName} size={16} /> : null}
      {remixName ? <Icon remixName={remixName} size={16} /> : null}
    </Component>
  );
}

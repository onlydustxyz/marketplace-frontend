import { cn } from "src/utils/cn";

import { tagVariants } from "components/ds/tag/tag.variants";
import { Tooltip } from "components/ds/tooltip/tooltip";

import { TTag } from "./tag.types";

export function Tag({
  as: Component = "div",
  id,
  testId,
  children,
  className,
  onClick,
  tooltipContent,
  containerClassName,
  ...props
}: TTag.Props) {
  function renderContent() {
    return (
      <Component
        data-testid={testId}
        id={id}
        className={cn("relative isolate w-fit shrink-0 overflow-hidden rounded-full p-px", containerClassName)}
        onClick={onClick}
      >
        <div className={cn(tagVariants({ ...props }), className, { "cursor-pointer": onClick })}>{children}</div>
      </Component>
    );
  }
  if (tooltipContent) {
    return <Tooltip content={tooltipContent}>{renderContent()}</Tooltip>;
  }
  return renderContent();
}

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
  ...props
}: TTag.Props) {
  function renderContent() {
    return (
      <Component
        data-testId={testId}
        id={id}
        className="relative isolate w-fit shrink-0 overflow-hidden rounded-full p-px"
        onClick={onClick}
      >
        <div className={cn(tagVariants({ ...props }), className)}>{children}</div>
      </Component>
    );
  }
  if (tooltipContent) {
    return <Tooltip content={tooltipContent}>{renderContent()}</Tooltip>;
  }
  return renderContent();
}

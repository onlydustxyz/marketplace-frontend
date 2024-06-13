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
    const { base, container } = tagVariants({ ...props });

    return (
      <Component
        data-testid={testId}
        id={id}
        className={cn(container(), { "cursor-pointer": onClick }, containerClassName)}
        onClick={onClick}
      >
        <div className={cn(base(), className)}>{children}</div>
      </Component>
    );
  }
  if (tooltipContent) {
    return <Tooltip content={tooltipContent}>{renderContent()}</Tooltip>;
  }
  return renderContent();
}

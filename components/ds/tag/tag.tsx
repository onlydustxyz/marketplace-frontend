import { cn } from "src/utils/cn";
import { tagVariants } from "components/ds/tag/tag.variants";
import { TTag } from "./tag.types";

export function Tag({ as: Component = "div", id, testId, children, className, onClick, ...props }: TTag.Props) {
  return (
    <Component
      data-testId={testId}
      id={id}
      className="w-fit shrink-0 overflow-hidden rounded-full p-px"
      onClick={onClick}
    >
      <div className={cn(tagVariants({ ...props }), className)}>{children}</div>
    </Component>
  );
}

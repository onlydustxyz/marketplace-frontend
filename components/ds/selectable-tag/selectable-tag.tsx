import { cn } from "src/utils/cn";

import { TSelectableTag } from "./selectable-tag.types";
import { selectableTagVariants } from "./selectable-tag.variants";

export function SelectableTag({ onClick, className, children, ...props }: TSelectableTag.Props) {
  return (
    <button onClick={onClick} className={cn(selectableTagVariants({ ...props }), className)}>
      {children}
    </button>
  );
}

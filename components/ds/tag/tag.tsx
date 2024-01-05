import { cn } from "src/utils/cn";
import React from "react";
import { tagVariants } from "@/components/ds/tag/tag.variants.ts";
import { TagProps } from "@/components/ds/tag/tag.type.ts";

export function Tag({ as: Component = "div", id, testId, children, className, onClick, ...props }: TagProps) {
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

export default Tag;

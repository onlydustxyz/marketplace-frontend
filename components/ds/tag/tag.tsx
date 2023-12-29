import { cn } from "src/utils/cn";
import React, { ElementType, PropsWithChildren } from "react";
import { tagVariants, TagVariants } from "@/components/ds/tag/tag.variants.ts";

interface TagProps extends PropsWithChildren, TagVariants {
  as?: ElementType;
  id?: string;
  testId?: string;
  className?: string;
  onClick?: () => void;
}

export default function Tag({ as: Component = "div", id, testId, children, className, onClick, ...props }: TagProps) {
  return (
    <Component data-testId={testId} id={id} className={cn(tagVariants({ ...props }), className)} onClick={onClick}>
      {children}
    </Component>
  );
}

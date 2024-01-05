import { FC, PropsWithChildren } from "react";
import { cn } from "src/utils/cn";
import { VariantProps, tv } from "tailwind-variants";

export type SelectableTagVariants = VariantProps<typeof selectableTagVariants>;

interface SelectableTagProps extends PropsWithChildren, SelectableTagVariants {
  onClick: () => void;
  className?: string;
}

export const selectableTagVariants = tv({
  base: "w-fit h-fit text-neutral-100 od-text-body-xs inline-flex items-center justify-center px-2 py-1 gap-1 rounded-lg border border-greyscale-50/8 bg-whiteFakeOpacity-10 relative",
  variants: {
    selected: {
      true: "before:absolute before:-inset-0.5 before:border-2 before:border-spacePurple-500 before:rounded-lg bg-spacePurple-900",
    },
  },
});

export const SelectableTag: FC<SelectableTagProps> = ({ onClick, className, children, ...props }) => {
  return (
    <button onClick={onClick} className={cn(selectableTagVariants({ ...props }), className)}>
      {children}
    </button>
  );
};

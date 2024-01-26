import { cn } from "src/utils/cn";
import { selectableTagItemVariants } from "components/ds/form/selectable-tag/selectable-tag-item/selectable-tag-item.variants";
import { TSelectableTagItem } from "components/ds/form/selectable-tag/selectable-tag-item/selectable-tag-item.types";
import { useCheckbox, VisuallyHidden } from "@nextui-org/react";

export function SelectableTagItem<V extends string>({
  value,
  className,
  children,
  checkboxProps = {},
  ...props
}: TSelectableTagItem.Props<V>) {
  const { isSelected, getBaseProps, getInputProps } = useCheckbox({
    value,
  });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} {...checkboxProps} />
      </VisuallyHidden>
      <div className={cn(selectableTagItemVariants({ ...props, selected: isSelected }), className)}>{children}</div>
    </label>
  );
}

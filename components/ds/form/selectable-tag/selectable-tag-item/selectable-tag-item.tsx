import { VisuallyHidden, useCheckbox } from "@nextui-org/react";
import { FC, PropsWithChildren, useMemo } from "react";

import { cn } from "src/utils/cn";

import { TSelectableTagItem } from "components/ds/form/selectable-tag/selectable-tag-item/selectable-tag-item.types";
import { selectableTagItemVariants } from "components/ds/form/selectable-tag/selectable-tag-item/selectable-tag-item.variants";

export function SelectableTagItem<V extends string>({
  value,
  className,
  children,
  checkboxProps = {},
  icon,
  activeIcon,
  active,
  disabled,
  ...props
}: TSelectableTagItem.Props<V>) {
  const { isSelected, getBaseProps, getInputProps } = useCheckbox({
    value,
    disabled,
  });

  const isActive = (isSelected && !disabled) || (active && !disabled);

  const iconProps = {
    active: isActive,
    color: "#FFFFFF",
    size: 16,
  };

  const Icon = useMemo(() => {
    if (isActive && activeIcon) {
      return activeIcon(iconProps);
    }

    if (icon) {
      return icon(iconProps);
    }

    return null;
  }, [iconProps]);

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} {...checkboxProps} />
      </VisuallyHidden>
      <div
        className={cn(
          selectableTagItemVariants({ ...props, selected: isActive || false, disabled: disabled || false }),
          className
        )}
      >
        {Icon}
        {children}
      </div>
    </label>
  );
}

SelectableTagItem.Static = function ({ className, children }) {
  return <div className={cn(selectableTagItemVariants(), className)}>{children}</div>;
} as FC<PropsWithChildren & { className?: string }>;
SelectableTagItem.Static.displayName = "SelectableTagItem.Static";

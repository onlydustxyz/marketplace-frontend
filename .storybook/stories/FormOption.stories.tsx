import { ComponentProps } from "react";
import { FormOption, Size, Variant } from "src/components/FormOption/FormOption";

export default {
  title: "FormOption",
  component: FormOption,
};

const defaultProps: ComponentProps<typeof FormOption> = {
  size: Size.Md,
};

export const Default = {
  render: () => (
    <div className="flex">
      <FormOption {...defaultProps}>Default</FormOption>
    </div>
  ),
};

const activeProps: ComponentProps<typeof FormOption> = {
  size: Size.Md,
  variant: Variant.Active,
};

export const Active = {
  render: () => (
    <div className="flex">
      <FormOption {...activeProps}>Active</FormOption>
    </div>
  ),
};

const smallProps: ComponentProps<typeof FormOption> = {
  size: Size.Sm,
};

export const Small = {
  render: () => (
    <div className="flex">
      <FormOption {...smallProps}>Small</FormOption>
    </div>
  ),
};

const largeProps: ComponentProps<typeof FormOption> = {
  size: Size.Lg,
};

export const Large = {
  render: () => (
    <div className="flex">
      <FormOption {...largeProps}>Large</FormOption>
    </div>
  ),
};

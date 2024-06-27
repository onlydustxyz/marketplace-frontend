interface Variants {
  color: "white" | "black";
  isDisabled: boolean;
}

interface ClassNames {
  base: string;
  label: string;
  wrapper: string;
  icon: string;
}

export interface CheckboxPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  onChange?: (checked: boolean) => void;
  value?: boolean;
  isDisabled?: boolean;
  mixed?: boolean;
}

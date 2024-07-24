interface Variants {
  isDisabled: boolean;
}

interface ClassNames {
  base: string;
  wrapper: string;
  thumb: string;
  label: string;
  startContent: string;
  endContent: string;
  thumbIcon: string;
}

export interface SwitchPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  onChange?: (isActive: boolean) => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

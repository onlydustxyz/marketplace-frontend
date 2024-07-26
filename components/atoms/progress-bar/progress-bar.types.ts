interface Variants {
  color: "brand-1" | "brand-2" | "brand-3" | "brand-4";
}

interface ClassNames {
  base: string;
  track: string;
  indicator: string;
}

export interface ProgressBarPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  min?: number;
  max?: number;
  value: number;
}

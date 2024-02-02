export namespace TSelectSort {
  export type Option = {
    id: string;
    label?: string;
  };

  export interface Props {
    labelToken: string;
    options: Option[];
    value: string | null;
    onChange(value: string): void;
  }
}

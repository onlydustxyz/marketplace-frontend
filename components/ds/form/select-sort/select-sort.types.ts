export namespace TSelectSort {
  export type Option = {
    id: string;
    label?: string;
  };

  export interface Props {
    labelToken: string;
    options: Option[];
    value: string;
    onChange(value: string): void;
  }
}

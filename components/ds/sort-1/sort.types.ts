export namespace TSort {
  export type Option = {
    id: string;
    label?: string;
  };

  export interface Props {
    label: string;
    options: Option[];
    value: string;
    onChange(value: string): void;
  }
}

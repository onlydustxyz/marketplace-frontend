export namespace TFiltersDropDown {
  export type Option = {
    id: string;
    label?: string;
  };

  export interface Props {
    title: string;
    image: string;
    options: Option[];
    value: string[];
    onChange(value: string[]): void;
  }
}

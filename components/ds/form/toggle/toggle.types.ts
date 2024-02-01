export namespace TToggle {
  export interface Props {
    ariaLabel: string;
    onChange: (value: boolean) => void;
    name?: string;
    value: boolean;
    disabled?: boolean;
  }
}

export namespace TSearchBar {
  export interface Props {
    value?: string | null;
    onChange: (value: string | null) => void;
    placeholder: string;
  }
}

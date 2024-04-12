export namespace TUsdInput {
  export interface Props {
    value: string;
    onChange: (value: string) => void;
    onFocus: (isOnFocus: boolean) => void;
  }
}

export namespace TMenuItem {
  export interface Props {
    href: string;
    label: string;
    onClick?: () => void;
    isActive: boolean;
  }
}

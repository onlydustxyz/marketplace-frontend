export namespace TCustomIcon {
  export type Names = "dollar" | "technology" | "gallery-line" | "arrow";

  export interface BaseProps {
    size?: number;
    color?: string;
  }

  export interface Props extends BaseProps {
    name?: Names;
  }
}

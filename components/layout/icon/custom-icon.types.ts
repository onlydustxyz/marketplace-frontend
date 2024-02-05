export namespace TCustomIcon {
  export type Names = "dollar" | "technology" | "galleryLine" | "arrow" | "whale";

  export interface BaseProps {
    size?: number;
    color?: string;
  }

  export interface Props extends BaseProps {
    name?: Names;
  }
}

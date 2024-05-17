export namespace TSkeleton {
  export type type = "text" | "rectangular" | "circular" | "rounded";
  export type color = "blue" | "grey" | "blue-700" | "blue-600";

  export interface BaseProps {
    width: string | number;
    height: string | number;
    radius?: number;
    color?: color;
    className?: string;
  }

  export interface Props extends BaseProps {
    variant?: type;
  }
}

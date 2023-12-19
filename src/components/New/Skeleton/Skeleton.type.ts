export type SkeletonType = "text" | "rectangular" | "circular" | "rounded";
export type SkeletonColor = "blue" | "grey";

export interface SkeletonBaseProps {
  width: string | number;
  height: string | number;
  radius?: number;
  color?: SkeletonColor;
  className?: string;
}

export interface SkeletonProps extends SkeletonBaseProps {
  variant?: SkeletonType;
}

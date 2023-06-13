import { DOMAttributes } from "react";

type Props = {
  className?: string;
} & DOMAttributes<HTMLElement>;

export default function EyeOffLine({ className, ...props }: Props) {
  return <i className={`ri-eye-off-line ${className}`} {...props} />;
}

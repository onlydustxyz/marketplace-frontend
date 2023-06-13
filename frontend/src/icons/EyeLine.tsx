import { DOMAttributes } from "react";

type Props = {
  className?: string;
} & DOMAttributes<HTMLElement>;

export default function EyeLine({ className, ...props }: Props) {
  return <i className={`ri-eye-line ${className}`} {...props} />;
}

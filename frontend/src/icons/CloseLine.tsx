import { DOMAttributes } from "react";

type Props = {
  className?: string;
} & DOMAttributes<HTMLElement>;

export default function CloseLine({ className, ...props }: Props) {
  return <i className={`ri-close-line ${className}`} {...props} />;
}

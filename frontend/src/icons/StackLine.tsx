interface Props {
  className?: string;
}

export default function StackLine({ className }: Props) {
  return <i className={`ri-stack-line ${className}`} />;
}

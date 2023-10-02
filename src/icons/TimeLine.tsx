interface Props {
  className?: string;
}

export default function Time({ className }: Props) {
  return <i className={`ri-time-line ${className}`} />;
}

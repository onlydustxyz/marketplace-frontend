interface Props {
  className?: string;
}

export default function CheckLine({ className }: Props) {
  return <i className={`ri-check-line ${className}`} />;
}

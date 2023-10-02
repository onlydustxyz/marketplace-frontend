interface Props {
  className?: string;
}

export default function Refresh({ className }: Props) {
  return <i className={`ri-refresh-line ${className}`} />;
}

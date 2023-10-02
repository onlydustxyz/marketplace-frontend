interface Props {
  className?: string;
}

export default function MoreLine({ className }: Props) {
  return <i className={`ri-more-line ${className}`} />;
}

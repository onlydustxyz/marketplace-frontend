interface Props {
  className?: string;
}

export default function StarLine({ className }: Props) {
  return <i className={`ri-star-line ${className}`} />;
}

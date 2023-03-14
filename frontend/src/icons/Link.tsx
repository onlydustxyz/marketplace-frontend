interface Props {
  className?: string;
}

export default function Link({ className }: Props) {
  return <i className={`ri-link ${className}`} />;
}

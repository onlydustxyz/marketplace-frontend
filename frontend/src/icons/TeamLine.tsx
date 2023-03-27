interface Props {
  className?: string;
}

export default function TeamLine({ className }: Props) {
  return <i className={`ri-team-line ${className}`} />;
}

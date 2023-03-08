interface Props {
  className?: string;
}

export default function BuildingLine({ className }: Props) {
  return <i className={`ri-building-line ${className}`} />;
}

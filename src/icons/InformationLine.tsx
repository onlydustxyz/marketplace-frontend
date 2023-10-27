interface Props {
  className?: string;
}

export default function InformationLine({ className }: Props) {
  return <i className={`ri-information-line ${className}`} />;
}

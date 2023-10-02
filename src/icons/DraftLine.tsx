interface Props {
  className?: string;
}

export default function DraftLine({ className }: Props) {
  return <i className={`ri-draft-line ${className}`} />;
}

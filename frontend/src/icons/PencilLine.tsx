interface Props {
  className?: string;
}

export default function PencilLine({ className }: Props) {
  return <i className={`ri-pencil-line ${className}`} />;
}

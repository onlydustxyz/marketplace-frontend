interface Props {
  className?: string;
}

export default function Focus({ className }: Props) {
  return <i className={`ri-focus-2-line ${className}`} />;
}

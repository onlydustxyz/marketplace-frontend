interface Props {
  className?: string;
}

export default function DiscussLine({ className }: Props) {
  return <i className={`ri-discuss-line ${className}`} />;
}

interface Props {
  className?: string;
}

export default function ExternalLinkLine({ className }: Props) {
  return <i className={`ri-external-link-line ${className}`} />;
}

interface Props {
  className?: string;
}

export default function ErrorWarningLine({ className }: Props) {
  return <i className={`ri-error-warning-line ${className}`} />;
}

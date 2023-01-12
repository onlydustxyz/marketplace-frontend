interface Props {
  className?: string;
}

export default function RiErrorWarningLine({ className }: Props) {
  return <i className={`ri-error-warning-line ${className}`} />;
}

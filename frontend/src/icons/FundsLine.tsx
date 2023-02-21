interface Props {
  className?: string;
}

export default function FundsLine({ className }: Props) {
  return <i className={`ri-funds-line ${className}`} />;
}

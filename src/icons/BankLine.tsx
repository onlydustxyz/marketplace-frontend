interface Props {
  className?: string;
}

export default function BankLine({ className }: Props) {
  return <i className={`ri-bank-line ${className}`} />;
}

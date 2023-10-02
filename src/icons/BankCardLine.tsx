interface Props {
  className?: string;
}

export default function BankCardLine({ className }: Props) {
  return <i className={`ri-bank-card-line ${className}`} />;
}

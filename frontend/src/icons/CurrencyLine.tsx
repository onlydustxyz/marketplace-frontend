interface Props {
  className?: string;
}

export default function CurrencyLine({ className }: Props) {
  return <i className={`ri-currency-line ${className}`} />;
}

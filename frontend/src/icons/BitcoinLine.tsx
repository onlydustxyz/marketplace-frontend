interface Props {
  className?: string;
}

export default function BitcoinLine({ className }: Props) {
  return <i className={`ri-bit-coin-line ${className}`} />;
}

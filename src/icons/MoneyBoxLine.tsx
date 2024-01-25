interface Props {
  className?: string;
}

export default function MoneyBoxLine({ className }: Props) {
  return <i className={`ri-money-dollar-box-line ${className}`} />;
}

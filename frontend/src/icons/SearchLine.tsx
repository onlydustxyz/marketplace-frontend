interface Props {
  className?: string;
}

export default function SearchLine({ className }: Props) {
  return <i className={`ri-search-line ${className}`} />;
}

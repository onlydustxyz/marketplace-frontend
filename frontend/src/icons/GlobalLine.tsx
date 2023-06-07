type Props = {
  className?: string;
};

export default function GlobalLine({ className }: Props) {
  return <i className={`ri-global-line ${className}`} />;
}

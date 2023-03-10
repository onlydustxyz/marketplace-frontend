type Props = {
  className?: string;
};

export default function CloseLine({ className }: Props) {
  return <i className={`ri-close-line ${className}`} />;
}

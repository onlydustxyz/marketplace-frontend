type Props = {
  className?: string;
  onClick?: () => void;
};

export default function CloseLine({ className, onClick }: Props) {
  return <i className={`ri-close-line ${className}`} onClick={onClick} />;
}

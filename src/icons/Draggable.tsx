interface Props {
  className?: string;
}

export default function Draggable({ className }: Props) {
  return <i className={`ri-draggable ${className}`} />;
}

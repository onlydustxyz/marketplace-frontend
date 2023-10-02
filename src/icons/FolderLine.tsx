interface Props {
  className?: string;
}

export default function Folder({ className }: Props) {
  return <i className={`ri-folder-3-line ${className}`} />;
}

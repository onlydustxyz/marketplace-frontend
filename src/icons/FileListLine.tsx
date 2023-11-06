interface Props {
  className?: string;
}

export default function FileListLine({ className }: Props) {
  return <i className={`ri-file-list-line ${className}`} />;
}

interface Props {
  className?: string;
}

export default function GitMergeLine({ className }: Props) {
  return <i className={`ri-git-merge-line ${className}`} />;
}

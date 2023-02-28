interface Props {
  className?: string;
}

export default function GitRepositoryLine({ className }: Props) {
  return <i className={`ri-git-repository-line ${className}`} />;
}

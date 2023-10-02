interface Props {
  className?: string;
}

export default function GitPullRequestLine({ className }: Props) {
  return <i className={`ri-git-pull-request-line ${className}`} />;
}

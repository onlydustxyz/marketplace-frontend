interface Props {
  className?: string;
}

export default function GithubLogo({ className }: Props) {
  return <i role="githubLogo" className={`ri-github-fill ${className}`} />;
}

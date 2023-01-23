interface Props {
  className?: string;
}

export default function GithubLogo({ className }: Props) {
  return <i className={`ri-github-fill ${className}`} />;
}

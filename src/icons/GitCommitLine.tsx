import classNames from "classnames";

interface Props {
  className?: string;
}

export default function GitCommitLine({ className }: Props) {
  return <i role="githubCommit" className={classNames("ri-git-commit-line text-base", className)} />;
}

import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}

export default function GitCommitLine({ className }: Props) {
  return <i role="githubCommit" className={cn("ri-git-commit-line text-base", className)} />;
}

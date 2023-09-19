import classNames from "classnames";

export enum Size {
  Medium = "Medium",
}

interface Props {
  size?: Size;
  className?: string;
}

export default function GitCommitLine({ size = Size.Medium, className }: Props) {
  return (
    <i
      role="githubCommit"
      className={classNames("ri-git-commit-line", { "text-base": size === Size.Medium, className })}
    />
  );
}

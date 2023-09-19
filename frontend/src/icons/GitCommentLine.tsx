import classNames from "classnames";

export enum Size {
  Medium = "Medium",
}

interface Props {
  size?: Size;
  className?: string;
}

export default function GitCommentLine({ size = Size.Medium, className }: Props) {
  return (
    <i
      role="githubComment"
      className={classNames("ri-question-answer-line", { "text-base": size === Size.Medium, className })}
    />
  );
}

import classNames from "classnames";

interface Props {
  className?: string;
}

export default function GitCommentLine({ className }: Props) {
  return <i role="githubComment" className={classNames("ri-question-answer-line text-base", className)} />;
}

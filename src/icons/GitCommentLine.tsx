import { cn } from "src/utils/cn";

interface Props {
  className?: string;
}

export default function GitCommentLine({ className }: Props) {
  return <i role="githubComment" className={cn("ri-question-answer-line text-base", className)} />;
}

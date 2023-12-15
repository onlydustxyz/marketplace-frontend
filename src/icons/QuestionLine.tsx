interface Props {
  className?: string;
}

export default function QuestionLine({ className }: Props) {
  return <i className={`ri-question-line ${className}`} />;
}

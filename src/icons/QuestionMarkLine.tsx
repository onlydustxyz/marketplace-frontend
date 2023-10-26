interface Props {
  className?: string;
}

export default function QuestionMarkLine({ className }: Props) {
  return <i className={`ri-question-line ${className}`} />;
}

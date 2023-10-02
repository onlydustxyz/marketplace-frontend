interface Props {
  className?: string;
}

export default function MailLine({ className }: Props) {
  return <i className={`ri-mail-line ${className}`} />;
}

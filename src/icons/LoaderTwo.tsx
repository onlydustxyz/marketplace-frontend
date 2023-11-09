interface Props {
  className?: string;
}

export default function LoaderTwo({ className }: Props) {
  return <i className={`ri-loader-2-line ${className}`} />;
}

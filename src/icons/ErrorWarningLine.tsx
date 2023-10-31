import classNames from "classnames";

interface Props {
  className?: string;
}

export default function ErrorWarningLine({ className }: Props) {
  return <i className={classNames("ri-error-warning-line", className)} />;
}

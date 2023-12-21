import { cn } from "src/utils/cn";

interface Props extends React.PropsWithChildren {
  className?: string;
}

export default function MessagePlaceholder({ children, className }: Props) {
  return (
    <p className={cn("whitespace-pre-line text-center font-walsheim text-sm text-greyscale-50", className)}>
      {children}
    </p>
  );
}

import { Link } from "react-router-dom";
import ArrowLeftSLine from "src/icons/ArrowLeftSLine";

interface BackLinkProps extends React.PropsWithChildren {
  to: string;
  className?: string;
}

export default function BackLink({ to, className = "", children }: BackLinkProps) {
  return (
    <div className="w-fit">
      <Link to={to}>
        <div className={`flex flex-row gap-2 items-center ${className}`}>
          <ArrowLeftSLine className="border border-neutral-100 rounded-lg p-1 w-6 h-6 flex items-center justify-center text-neutral-100" />
          <div className="font-walsheim font-semibold text-base">{children}</div>
        </div>
      </Link>
    </div>
  );
}

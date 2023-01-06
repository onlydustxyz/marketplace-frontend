import { Link } from "react-router-dom";
import BackArrow from "src/assets/icons/BackArrow";

interface BackLinkProps extends React.PropsWithChildren {
  to: string;
  className?: string;
}

export default function BackLink({ to, className = "", children }: BackLinkProps) {
  return (
    <div className="w-fit">
      <Link to={to}>
        <div className={`flex flex-row gap-2 items-center ${className}`}>
          <BackArrow className="border border-neutral-100 rounded-lg p-1 w-6 h-6 fill-neutral-100" />
          <div className="font-walsheim font-semibold text-base">{children}</div>
        </div>
      </Link>
    </div>
  );
}

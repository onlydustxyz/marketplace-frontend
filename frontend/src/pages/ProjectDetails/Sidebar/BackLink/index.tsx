import { Link } from "react-router-dom";
import ArrowLeftSLine from "src/icons/ArrowLeftSLine";
import { RESTORE_SCROLL_POSITION_KEY } from "src/pages/Projects/AllProjects/useScrollRestoration";

interface BackLinkProps extends React.PropsWithChildren {
  to: string;
  className?: string;
}

export default function BackLink({ to, className = "", children }: BackLinkProps) {
  return (
    <div className="w-fit">
      <Link to={to} state={{ [RESTORE_SCROLL_POSITION_KEY]: true }}>
        <div className={`flex flex-row items-center gap-3 ${className}`}>
          <ArrowLeftSLine className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-100 p-1 text-neutral-100 xl:h-6 xl:w-6" />
          <div className="font-belwe text-base">{children}</div>
        </div>
      </Link>
    </div>
  );
}

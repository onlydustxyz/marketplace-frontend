import { useIntl } from "src/hooks/useIntl";
import { withTooltip } from "src/components/Tooltip";
import LockFill from "src/icons/LockFill";

export default function PrivateTag() {
  const { T } = useIntl();

  return (
    <div
      className="rounded-full w-5 h-5 p-1 bg-orange-500 text-greyscale-50 text-xs leading-3 hover:outline hover:outline-2 hover:outline-orange-500/30"
      {...withTooltip(T("project.visibility.private.tooltip"))}
    >
      <LockFill />
    </div>
  );
}

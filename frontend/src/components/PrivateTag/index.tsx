import { useIntl } from "src/hooks/useIntl";
import { withTooltip } from "src/components/Tooltip";
import LockFill from "src/icons/LockFill";

export default function PrivateTag() {
  const { T } = useIntl();

  return (
    <div
      className="h-5 w-5 rounded-full bg-orange-500 p-1 text-xs leading-3 text-greyscale-50 hover:outline hover:outline-2 hover:outline-orange-500/30"
      {...withTooltip(T("project.visibility.private.tooltip"))}
    >
      <LockFill />
    </div>
  );
}

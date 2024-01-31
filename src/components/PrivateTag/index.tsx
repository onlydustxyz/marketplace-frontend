import LockFill from "src/icons/LockFill";

import { Tooltip } from "components/ds/tooltip/tooltip";
import { Translate } from "components/layout/translate/translate";

export default function PrivateTag() {
  return (
    <Tooltip content={<Translate token="v2.pages.projects.visibility.private.tooltip" />}>
      <div className="h-5 w-5 rounded-full bg-orange-500 p-1 text-xs leading-3 text-greyscale-50 hover:outline hover:outline-2 hover:outline-orange-500/30">
        <LockFill />
      </div>
    </Tooltip>
  );
}

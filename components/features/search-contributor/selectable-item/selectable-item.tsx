import { IMAGES } from "src/assets/img";
import CheckLine from "src/icons/CheckLine";

import { Avatar } from "components/ds/avatar/avatar";

import { TSelectableItem } from "./selectable-item.types";

export function SelectableItem({ avatarUrl, login, isRegistered, selected }: TSelectableItem.Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar src={avatarUrl || ""} alt={login} shape="circle" size="s" />

        <span className="block flex-1 truncate">{login}</span>

        {isRegistered ? <Avatar src={IMAGES.logo.original} alt="Onlydust" size="xs" /> : null}
      </div>

      {selected ? <CheckLine className="h-4 w-4" /> : null}
    </div>
  );
}

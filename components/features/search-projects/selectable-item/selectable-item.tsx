import CheckLine from "src/icons/CheckLine";

import { Avatar } from "components/ds/avatar/avatar";

import { TSelectableProjectItem } from "./selectable-item.types";

export function SelectableProjectItem({ logoUrl, name, selected }: TSelectableProjectItem.Props) {
  return (
    <div className="flex items-center justify-between">
      <Avatar.Labelled
        avatarProps={{
          src: logoUrl || "",
          alt: name,
          shape: "square",
          size: "s",
        }}
      >
        {name}
      </Avatar.Labelled>

      {selected ? <CheckLine className="h-4 w-4" /> : null}
    </div>
  );
}

import { Avatar } from "src/components/New/Avatar";
import CloseLine from "src/icons/CloseLine";

import { TEcosystemSelectItem } from "./ecosystem-select-item.types";

export function EcosystemSelectItem({ id, label, value, image, onRemove }: TEcosystemSelectItem.Props) {
  function handleRemove() {
    onRemove(id);
  }

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        <Avatar src={image || ""} alt={value} shape="circle" size="6" />
        <span className=" text-sm leading-[14px] text-spacePurple-300">{label}</span>
      </div>

      <button type="button" onClick={handleRemove} className="leading-none">
        <CloseLine className="h-4 w-4 text-spacePurple-300" />
      </button>
    </div>
  );
}

import CloseLine from "src/icons/CloseLine";

import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { TProjectCategoriesSelectItem } from "./project-categories-select.types";

export function ProjectCategoriesSelectItem({ id, label, iconSlug, onRemove }: TProjectCategoriesSelectItem.Props) {
  function handleRemove() {
    onRemove(id);
  }

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        <Icon remixName={iconSlug as RemixIconsName} />
        <span className=" text-sm leading-[14px] text-spacePurple-300">{label}</span>
      </div>

      <button type="button" onClick={handleRemove} className="leading-none">
        <CloseLine className="h-4 w-4 text-spacePurple-300" />
      </button>
    </div>
  );
}

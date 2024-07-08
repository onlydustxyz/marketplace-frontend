import CloseLine from "src/icons/CloseLine";
import { cn } from "src/utils/cn";

import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { TProjectCategoriesSelectItem } from "./project-categories-select.types";

export function ProjectCategoriesSelectItem({
  id,
  label,
  iconSlug,
  onRemove,
  isSuggestion,
}: TProjectCategoriesSelectItem.Props) {
  function handleRemove() {
    onRemove(id);
  }

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        {!!iconSlug && <Icon remixName={iconSlug as RemixIconsName} />}
        <span
          className={cn("text-sm leading-[14px] text-spacePurple-300", {
            "italic text-spaceBlue-200": isSuggestion,
          })}
        >
          {label}
        </span>
      </div>

      <button type="button" onClick={handleRemove} className="flex items-end justify-center leading-none">
        <CloseLine
          className={cn("h-4 w-4 text-spacePurple-300", {
            "text-spaceBlue-200": isSuggestion,
          })}
        />
      </button>
    </div>
  );
}

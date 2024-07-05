import { FieldLabel } from "src/components/New/Field/Label";

import { SelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { ProjectCategoriesSelectItem } from "./project-categories-select-item/project-categories-select-item";
import { TProjectCategoriesSelect } from "./project-categories-select.types";

export function ProjectCategoriesSelect({ selected, onChange, categories, name }: TProjectCategoriesSelect.Props) {
  const onRemove = (id: string | number) => {
    onChange?.(selected?.filter(item => item.id !== id));
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <FieldLabel id={name}>
        <Translate token="v2.features.filters.categories.title" />
      </FieldLabel>
      <div className="flex flex-col gap-3">
        <div className="w-fit">
          <SelectAutocomplete
            type="circle"
            icon={({ className }) => <Icon remixName="ri-global-line" className={className} />}
            tokens={{
              zero: "v2.features.filters.categories.all",
              other: "v2.features.filters.categories",
              empty: "v2.features.filters.categories.empty",
            }}
            items={categories}
            multiple
            selected={selected || []}
            onChange={onChange}
            disabled={categories.length <= 1}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          {selected?.map(item => (
            <ProjectCategoriesSelectItem {...item} onRemove={onRemove} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

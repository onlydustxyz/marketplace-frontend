import { EcosystemSelectItem } from "src/_pages/ProjectCreation/views/ProjectInformations/components/ecosystem-select/ecosystem-select-item/ecosystem-select-item";
import { FieldLabel } from "src/components/New/Field/Label";

import { SelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { TEcosystemSelect } from "./ecosystem-select.types";

export function EcosystemSelect({ selected, onChange, ecosystems, name }: TEcosystemSelect.Props) {
  const onRemove = (id: string | number) => {
    onChange?.(selected?.filter(item => item.id !== id));
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <FieldLabel id={name}>
        <Translate token="v2.features.filters.ecosystems.title" />
      </FieldLabel>
      <div className="flex flex-col gap-3">
        <div className="w-fit">
          <SelectAutocomplete
            type="circle"
            icon={({ className }) => <Icon remixName="ri-global-line" className={className} />}
            tokens={{
              zero: "v2.features.filters.ecosystems.all",
              other: "v2.features.filters.ecosystems",
              empty: "v2.features.filters.ecosystems.empty",
            }}
            items={ecosystems}
            multiple
            selected={selected || []}
            onChange={onChange}
            disabled={ecosystems.length <= 1}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          {selected?.map(item => (
            <EcosystemSelectItem {...item} onRemove={onRemove} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

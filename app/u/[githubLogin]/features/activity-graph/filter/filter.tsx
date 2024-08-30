"use client";

import { Selection } from "@nextui-org/react";
import { useMemo } from "react";

import { Avatar } from "components/ds/avatar/avatar";
import { Select } from "components/ds/form/select/select";

import { useIntl } from "hooks/translate/use-translate";

import { TFilter } from "./filter.types";

export function Filter({ ecosystems, value, onChange }: TFilter.Props) {
  const { T } = useIntl();
  const _ecosystems = useMemo(() => {
    const dynamic =
      ecosystems?.map(e => ({
        label: e.name,
        value: `${e.id}`,
        startContent: <Avatar src={e.logoUrl || undefined} size={"xs"} />,
      })) ?? [];

    return [{ label: T("v2.features.filters.ecosystems.all"), value: "", startContent: undefined }, ...dynamic];
  }, [ecosystems]);

  const selectedEcosystem = useMemo(() => _ecosystems.find(s => s.value === value), [_ecosystems, value]);

  function handleProgramChange(keys: Selection) {
    const [ecosystemId] = keys;

    if (ecosystemId === "") {
      return onChange(ecosystemId);
    }

    if (typeof ecosystemId === "string") {
      return onChange(ecosystemId);
    }
  }

  return (
    <Select
      placeholder={T("v2.features.filters.ecosystems.all")}
      defaultSelectedKeys={value ? [value] : undefined}
      disabledKeys={[value ?? ""]}
      startContent={selectedEcosystem?.startContent}
      items={_ecosystems}
      onSelectionChange={handleProgramChange}
      classNames={{
        base: "w-full sm:w-[250px]",
      }}
      size={"sm"}
    />
  );
}

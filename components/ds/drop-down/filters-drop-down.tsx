"use client";

import { useState } from "react";
import { SelectableTag } from "../selectable-tag/selectable-tag";
import { Icon } from "components/layout/icon/icon";
import { cn } from "src/utils/cn";
import { Flex } from "components/layout/flex/flex";
import { Translate } from "components/layout/translate/translate";
import { Badge } from "../badge/badge";
import Image from "next/image";
import { TFiltersDropDown } from "./filters-drop-down.types";

export function FiltersDropDown({ title, image, options, value, onChange }: TFiltersDropDown.Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleDropDownClick = () => setIsOpen(!isOpen);

  const handleTagClick = (tag: TFiltersDropDown.Option) => {
    const selectedOption = options.find(o => o.id === tag.id);
    const isSelected = value.find(v => v === tag.id);
    if (selectedOption) {
      const newValue = isSelected ? value.filter(v => v !== tag.id) : [...value, selectedOption.id];
      onChange(newValue);
    }
  };

  return (
    <div>
      <Flex
        alignItems="center"
        justifyContent="between"
        width="full"
        onClick={handleDropDownClick}
        className="border-b border-greyscale-50/12	py-2 text-sm leading-4 text-greyscale-50"
        as="button"
      >
        <Flex alignItems="center" className="gap-2">
          <Image src={image} alt={title} width={24} height={24} loading="lazy" />
          <Translate token={title} />
        </Flex>

        <Flex alignItems="center" className="gap-2">
          {value.length > 0 ? <Badge value={value.length} /> : null}

          <span
            className={cn("transition duration-300", {
              "-rotate-180": !isOpen,
              "-rotate-90": isOpen,
            })}
          >
            <Icon remixName="ri-arrow-left-s-line" />
          </span>
        </Flex>
      </Flex>

      {isOpen && (
        <Flex wrap="wrap" width="full" className="gap-x-2 gap-y-3 py-3">
          {options.map(option => (
            <SelectableTag key={option.id} selected={value.includes(option.id)} onClick={() => handleTagClick(option)}>
              {option.label || option.id}
            </SelectableTag>
          ))}
        </Flex>
      )}
    </div>
  );
}

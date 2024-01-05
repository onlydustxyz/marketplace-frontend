"use client";

import { FC, useState } from "react";
import { SelectableTag } from "../selectable-tag/selectable-tag";
import { Icon } from "@/components/layout/icon/icon";
import { cn } from "src/utils/cn";
import { Flex } from "@/components/layout/flex/flex";
import Translate from "@/components/layout/translate/translate";
import { Badge } from "../badge/badge";
import Image from "next/image";

interface FiltersDropDownProps {
  title: string;
  image: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

export const FiltersDropDown: FC<FiltersDropDownProps> = ({ title, image, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleDropDownClick = () => setIsOpen(!isOpen);

  const handleTagClick = (tag: string) => {
    const newValue = value.includes(tag) ? value.filter(v => v !== tag) : [...value, tag];
    onChange(newValue);
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
            <SelectableTag key={option} selected={value.includes(option)} onClick={() => handleTagClick(option)}>
              {option}
            </SelectableTag>
          ))}
        </Flex>
      )}
    </div>
  );
};

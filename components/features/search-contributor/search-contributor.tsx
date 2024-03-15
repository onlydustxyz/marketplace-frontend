import { Listbox, ListboxItem, ListboxSection, Spinner } from "@nextui-org/react";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { IMAGES } from "src/assets/img";

import { Avatar } from "components/ds/avatar/avatar";
import { Input } from "components/ds/form/input/input";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { useSearchContributors } from "components/features/search-contributor/hooks/use-search-contributors";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { TSearchContributor } from "./search-contributor.types";

export function SearchContributor({
  onSelectContributors,
  initialValue,
  selectionMode = "single",
  ...listboxProps
}: TSearchContributor.Props) {
  const ref = useRef(null);

  const {
    searchQuery,
    isLoading,
    openListbox,
    selectedKeys,
    contributors,
    renderValue,
    handleQuery,
    handleClickOutside,
    onSelectElement,
    setOpenListbox,
  } = useSearchContributors({ onSelectContributors, initialValue });
  useOnClickOutside(ref, handleClickOutside);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative flex flex-col gap-3">
        <Input
          startContent={renderValue}
          endContent={<Icon remixName="ri-arrow-down-s-line" className="pointer-events-none" />}
          onChange={e => handleQuery(e.target.value)}
          className="relative z-30 flex w-full flex-col"
          onFocus={() => setOpenListbox(true)}
          value={searchQuery}
        />
        {openListbox ? (
          <div
            className="absolute -left-[12px] -top-[24px] z-20 flex max-h-[280px] w-[calc(100%_+_24px)] max-w-[calc(100%_+_24px)]
          translate-y-1.5 flex-col gap-4 rounded-2xl border border-default-200 border-greyscale-50/12
          bg-greyscale-800 p-4 pt-[60px] shadow-heavy  focus:outline-none dark:border-default-100"
            ref={ref}
          >
            <div className="scrollbar-sm overflow-y-scroll">
              <Listbox
                selectionMode={selectionMode}
                selectedKeys={selectedKeys}
                onSelectionChange={onSelectElement}
                bottomContent={isLoading ? <Spinner /> : null}
                {...listboxProps}
                items={contributors}
              >
                {item => (
                  <ListboxSection key={item.name} title={item.name} showDivider={item.showDivider}>
                    {item.items?.map(item => (
                      <ListboxItem
                        key={item.githubUserId}
                        startContent={<Avatar src={item.avatarUrl} alt={item.login} shape="circle" size="s" />}
                      >
                        <div className="flex flex-row gap-2">
                          {item.login}
                          {item.isRegistered ? (
                            <Tooltip
                              content={<Translate token="v2.features.contributors.table.userRegisteredTooltip" />}
                            >
                              <Avatar src={IMAGES.logo.original} alt="OnlyDust" size="xs" />
                            </Tooltip>
                          ) : null}
                        </div>
                      </ListboxItem>
                    ))}
                  </ListboxSection>
                )}
              </Listbox>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

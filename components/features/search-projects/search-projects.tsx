import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { ShowMore } from "src/components/Table/ShowMore";
import { cn } from "src/utils/cn";

import { Avatar } from "components/ds/avatar/avatar";
import { Input } from "components/ds/form/input/input";
import { Icon } from "components/layout/icon/icon";

import { useIntl } from "hooks/translate/use-translate";

import { useSearchProjects } from "./hooks/use-search-projects";
import { TSearchProjects } from "./search-projects.types";

export function SearchProjects({
  onSelectProjects,
  initialValue,
  selectionMode = "single",
  isElevated,
  listboxProps,
  size = "md",
}: TSearchProjects.Props) {
  const { T } = useIntl();

  const {
    searchQuery,
    query,
    openListbox,
    selectedKeys,
    projects,
    renderValue,
    handleQuery,
    handleClickOutside,
    onSelectElement,
    setOpenListbox,
  } = useSearchProjects({
    onSelectProjects,
    initialValue,
    isMultiple: selectionMode === "multiple",
  });

  const ref = useRef(null);
  useOnClickOutside(ref, handleClickOutside);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative flex flex-col gap-3">
        <Input
          startContent={renderValue}
          endContent={<Icon remixName="ri-arrow-down-s-line" className="pointer-events-none" />}
          onChange={e => handleQuery(e.target.value)}
          className={cn("relative z-30 flex w-full flex-col", {
            "h-12 text-base": size === "lg",
          })}
          onFocus={() => setOpenListbox(true)}
          value={searchQuery}
          placeholder={!selectedKeys.size ? T("v2.features.filters.projects.placeholder") : undefined}
        />
        {openListbox ? (
          <div
            className={cn(
              "absolute -left-[12px] -top-[24px] z-20 flex max-h-[280px] w-[calc(100%_+_24px)] max-w-[calc(100%_+_24px)] translate-y-1.5 flex-col gap-4 rounded-2xl border border-default-200 border-greyscale-50/12 p-4 shadow-heavy focus:outline-none",
              {
                "bg-greyscale-800": isElevated,
                "bg-greyscale-900": !isElevated,
                "pt-[60px]": size === "md",
                "pt-[72px]": size === "lg",
              }
            )}
            ref={ref}
          >
            <div className="scrollbar-sm overflow-y-scroll">
              <Listbox
                selectionMode={selectionMode}
                selectedKeys={selectedKeys}
                onSelectionChange={onSelectElement}
                bottomContent={
                  query.hasNextPage ? (
                    <ShowMore onClick={query.fetchNextPage} loading={query.isFetchingNextPage} />
                  ) : null
                }
                items={projects}
                aria-label={T("v2.features.filters.projects.projects")}
                {...listboxProps}
              >
                {item => (
                  <ListboxSection key={item.name} title={item.name} showDivider={item.showDivider}>
                    {item.items?.map(({ id, logoUrl, name }) => (
                      <ListboxItem key={id} textValue={name}>
                        <Avatar.Labelled
                          avatarProps={{
                            src: logoUrl,
                            alt: name,
                            shape: "square",
                            size: "s",
                          }}
                        >
                          {name}
                        </Avatar.Labelled>
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

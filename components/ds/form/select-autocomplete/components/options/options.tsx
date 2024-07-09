import { Combobox } from "@headlessui/react";
import { InView } from "react-intersection-observer";

import { Spinner } from "src/components/Spinner/Spinner";

import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { Option } from "../option/option";
import { TOptions } from "./options.types";

export function Options({
  selectedItems,
  filteredItems,
  query,
  type,
  suggestAction,
  emptyMessage,
  loadingNextPage,
  onNextPage,
}: TOptions.Props) {
  return (
    <>
      {selectedItems.length ? (
        <div className="flex flex-col gap-1 pb-2">
          {selectedItems.map(item => (
            <Combobox.Option key={item.id} value={item}>
              {({ active, selected }) => <Option selected={selected} active={active} type={type} item={item} />}
            </Combobox.Option>
          ))}
        </div>
      ) : null}
      <div className="flex flex-col gap-1">
        {filteredItems.map((item, key) => (
          <>
            <Combobox.Option key={item.id} value={item}>
              {({ active, selected }) => <Option selected={selected} active={active} type={type} item={item} />}
            </Combobox.Option>
            {onNextPage && key === filteredItems.length - 1 ? (
              <InView
                className="width-full flex min-h-1 flex-row items-center justify-center"
                onChange={inView => {
                  if (inView) {
                    onNextPage();
                  }
                }}
              >
                {loadingNextPage && <Spinner />}
              </InView>
            ) : null}
          </>
        ))}
        {filteredItems.length === 0 && (
          <>
            <Typography
              variant="body-s"
              as="p"
              className="px-2 py-2 italic text-greyscale-100"
              translate={{ token: emptyMessage || "filters.noResults" }}
            />
            {!!suggestAction && (
              <button
                type="button"
                onClick={query ? () => suggestAction.onClick(query) : undefined}
                className={"flex cursor-pointer items-center gap-3 rounded-md px-2 py-2"}
              >
                <Icon {...suggestAction.icon} />
                <span className="flex-1 truncate text-left font-walsheim text-sm text-greyscale-50">{`${
                  suggestAction.label
                } ${query ? `"${query}"` : ""}`}</span>
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}

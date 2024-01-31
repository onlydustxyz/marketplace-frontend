import { Combobox } from "@headlessui/react";
import { Typography } from "components/layout/typography/typography";
import { InView } from "react-intersection-observer";
import { Spinner } from "src/components/Spinner/Spinner";

import { Option } from "../option/option";
import { TOptions } from "./options.types";

export function Options({
  selectedItems,
  filteredItems,
  type,
  emptyMessage,
  loadingNextPage,
  onNextPage,
}: TOptions.Props) {
  return (
    <div className="max-h-60 divide-y divide-card-border-light overflow-auto px-2 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
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
                className="width-full min-h-1 flex flex-row items-center justify-center"
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
          <Typography
            variant="body-s"
            as="p"
            className="px-2 py-2 italic text-greyscale-100"
            translate={{ token: emptyMessage || "filters.noResults" }}
          />
        )}
      </div>
    </div>
  );
}

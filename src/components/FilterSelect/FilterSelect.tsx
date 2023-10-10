import { Listbox, Transition } from "@headlessui/react";
import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import { ReactElement, useState } from "react";
import { FilterField } from "src/components/FilterField/FilterField";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import CheckLine from "src/icons/CheckLine";
import { cn } from "src/utils/cn";

type Item = {
  id: number | string;
  label: string;
  image?: string | null;
} & Record<string, unknown>;

export function FilterSelect({
  label,
  icon,
  tokens,
  items,
  multiple = false,
  disabled = false,
}: {
  label: string;
  icon?: (className: string) => ReactElement;
  tokens: Record<"zero" | "other", string>;
  items: Item[];
  multiple?: boolean;
  disabled?: boolean;
}) {
  const { T } = useIntl();
  const [selected, setSelected] = useState<Item | Item[] | null>(multiple ? [] : null);

  function renderToken() {
    if (Array.isArray(selected)) {
      return selected?.length ? T(tokens.other, { count: selected.length }) : T(tokens.zero);
    }

    return selected?.label ?? T(tokens.zero);
  }

  return (
    <FilterField label={label}>
      <div className={cn("relative", { "opacity-50": disabled })}>
        <Listbox value={selected} onChange={setSelected} multiple={multiple} disabled={disabled}>
          {({ open }) => (
            <>
              <Listbox.Button
                className={cn(
                  "flex w-full items-center gap-6 rounded-lg border border-greyscale-50/8 bg-white/5 px-2.5 py-1.5 text-greyscale-50 shadow-lg",
                  {
                    "border-spacePurple-500 bg-spacePurple-900 text-spacePurple-200 outline-double outline-1 outline-spacePurple-500":
                      open,
                  }
                )}
              >
                <span className="flex flex-1 items-center gap-2">
                  {icon
                    ? icon(
                        cn("text-base leading-none", {
                          "text-spacePurple-500": open,
                        })
                      )
                    : null}
                  <span className="font-walsheim text-sm leading-none">{renderToken()}</span>
                </span>
                <ArrowDownSLine
                  className={cn("text-xl leading-none text-spaceBlue-200", {
                    "text-spacePurple-300": open,
                  })}
                />
              </Listbox.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                className="absolute -left-1.5 -right-1.5 z-10 origin-top translate-y-1.5 overflow-hidden rounded-2xl border border-greyscale-50/12 bg-whiteFakeOpacity-8 shadow-lg"
              >
                <Listbox.Options className="max-h-60 divide-y divide-greyscale-50/8 overflow-auto bg-white/5 py-2 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
                  {items.map(item => (
                    <Listbox.Option key={item.id} value={item}>
                      {({ selected, active }) => (
                        <div
                          className={cn("flex cursor-pointer items-center gap-3 px-4 py-2", { "bg-white/2": active })}
                        >
                          {typeof item.image !== "undefined" ? (
                            <RoundedImage
                              src={item?.image ?? onlyDustLogo}
                              alt={item.label}
                              rounding={Rounding.Corners}
                              size={ImageSize.Sm}
                            />
                          ) : null}
                          <span className="flex-1 truncate font-walsheim text-sm text-greyscale-50">{item.label}</span>
                          {selected ? <CheckLine className="text-xl leading-none text-greyscale-50" /> : null}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </>
          )}
        </Listbox>
      </div>
    </FilterField>
  );
}

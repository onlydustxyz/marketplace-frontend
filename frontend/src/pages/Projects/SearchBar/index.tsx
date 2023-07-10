import classNames from "classnames";
import { useEffect, useState } from "react";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";
import CloseLine from "src/icons/CloseLine";
import SearchLine from "src/icons/SearchLine";
import { useDebounce, useMediaQuery } from "usehooks-ts";

type Props = {
  searchQuery: string;
  setSearchQuery: (search: string) => void;
};

export default function SearchBar({ searchQuery, setSearchQuery }: Props) {
  const { T } = useIntl();
  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  const [search, setSearch] = useState<string>(searchQuery);
  const debouncedSearchQuery = useDebounce<string>(search, 200);

  useEffect(() => setSearchQuery(debouncedSearchQuery), [debouncedSearchQuery]);

  const [inputFocus, setInputFocus] = useState(false);

  return (
    <div
      className={classNames("overflow-hidden rounded-full p-0.5", {
        "bg-spacePurple-500 outline outline-4 outline-spacePurple-500/25": inputFocus,
      })}
    >
      <div
        className={classNames("relative z-10 flex items-center justify-center rounded-full", {
          "before:absolute before:-z-10 before:h-screen before:w-screen before:scale-x-[20] before:bg-multi-color-gradient":
            !inputFocus,
        })}
      >
        <div
          className={classNames("flex h-12 w-full flex-row items-center gap-5 rounded-full px-6 md:h-16", {
            "bg-spaceBlue-900": !inputFocus,
            "bg-spacePurple-900": inputFocus,
          })}
        >
          <SearchLine
            className={classNames(
              "text-3xl",
              { "text-spaceBlue-200": !inputFocus },
              { "text-greyscale-50": inputFocus }
            )}
          />
          <input
            placeholder={T(isMd ? "searchBar.placeholder" : "searchBar.placeholderShort")}
            className="h-8 w-full bg-transparent font-walsheim text-lg font-medium text-greyscale-50 outline-none placeholder:text-spaceBlue-200"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
          />
          <button>
            <CloseLine
              className={classNames(
                "text-3xl",
                { hidden: !inputFocus && !searchQuery },
                { "text-greyscale-50": inputFocus || searchQuery }
              )}
              onClick={e => {
                e.preventDefault();
                setSearch("");
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

import classNames from "classnames";
import { useEffect, useState } from "react";
import { useIntl } from "src/hooks/useIntl";
import CloseLine from "src/icons/CloseLine";
import SearchLine from "src/icons/SearchLine";
import { useProjectFilter } from "src/pages/Projects/useProjectFilter";
import { useDebounce } from "usehooks-ts";

export default function SearchBar() {
  const { T } = useIntl();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce<string>(searchQuery, 100);

  const { setSearch } = useProjectFilter();
  useEffect(() => setSearch(debouncedSearchQuery), [debouncedSearchQuery]);

  const [inputFocus, setInputFocus] = useState(false);

  return (
    <div
      className={classNames("overflow-hidden rounded-xl p-0.5", {
        "bg-multi-color-gradient": !inputFocus,
        "bg-spacePurple-500 outline outline-4 outline-spacePurple-500/25": inputFocus,
      })}
    >
      <div
        className={classNames("relative flex h-16 flex-row items-center gap-5 rounded-[11px] px-6", {
          "bg-spaceBlue-900": !inputFocus,
          "bg-spacePurple-900": inputFocus,
        })}
      >
        <SearchLine
          className={classNames(
            "text-3xl",
            { "text-spaceBlue-200": !inputFocus && !searchQuery },
            { "text-greyscale-50": inputFocus || searchQuery }
          )}
        />
        <input
          placeholder={T("searchBar.placeholder")}
          className="h-8 w-full bg-transparent font-walsheim text-lg font-medium text-greyscale-50 outline-none placeholder:text-spaceBlue-200"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
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
              setSearchQuery("");
            }}
          />
        </button>
      </div>
    </div>
  );
}

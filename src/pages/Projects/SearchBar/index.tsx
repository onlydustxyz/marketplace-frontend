import { cn } from "src/utils/cn";
import { PropsWithChildren, useRef, useState } from "react";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";
import CloseLine from "src/icons/CloseLine";
import SearchLine from "src/icons/SearchLine";
import { useMediaQuery } from "usehooks-ts";
import { useHotkeys } from "react-hotkeys-hook";

type Props = {
  search: string;
  setSearch: (search: string) => void;
};

export default function SearchBar({ search, setSearch }: Props) {
  const { T } = useIntl();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const [inputFocus, setInputFocus] = useState(false);

  const textInput = useRef<HTMLInputElement>(null);

  useHotkeys("mod+k", () => {
    textInput.current && textInput.current.focus();
  });
  useHotkeys(
    "esc",
    () => {
      textInput.current && textInput.current.blur();
    },
    { enableOnFormTags: true }
  );

  return (
    <div
      className={cn("overflow-hidden rounded-full p-0.5", {
        "bg-spacePurple-500": inputFocus,
      })}
    >
      <div
        className={cn("relative z-10 flex items-center justify-center rounded-full", {
          "before:absolute before:-z-10 before:h-screen before:w-screen before:scale-x-[8] before:bg-multi-color-gradient before:md:scale-x-[30]":
            !inputFocus,
          "overflow-hidden": !isXl,
        })}
      >
        <ResponsiveOutlineWrapper>
          <div
            className={cn("flex h-12 w-full flex-row items-center gap-2 rounded-full px-4", {
              "bg-spaceBlue-900": !inputFocus,
              "bg-spacePurple-900": inputFocus,
            })}
          >
            <SearchLine
              className={cn("text-2xl", { "text-spaceBlue-200": !inputFocus }, { "text-greyscale-50": inputFocus })}
            />
            <input
              placeholder={T("searchBar.placeholderShort")}
              className="h-8 w-full bg-transparent font-walsheim text-lg text-greyscale-50 outline-none placeholder:text-spaceBlue-200"
              value={search}
              ref={textInput}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
            />
            <button data-testid="clear-searchbar-button">
              <CloseLine
                className={cn(
                  "text-2xl",
                  { hidden: !inputFocus && !search },
                  { "text-greyscale-50": !inputFocus && search },
                  { "text-purple-200": inputFocus }
                )}
                onClick={e => {
                  e.preventDefault();
                  setSearch("");
                }}
              />
            </button>
          </div>
        </ResponsiveOutlineWrapper>
      </div>
    </div>
  );
}

function ResponsiveOutlineWrapper({ children }: PropsWithChildren) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  return isXl ? <>{children}</> : <div className="w-full rounded-full border-2 border-transparent">{children}</div>;
}

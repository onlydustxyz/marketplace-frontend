import { ChangeEvent, ReactElement, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useMediaQuery } from "usehooks-ts";

import { viewportConfig } from "src/config";
import { cn } from "src/utils/cn";

import { Icon } from "components/layout/icon/icon";

import { TSearchBar } from "./search-bar.types";

export function SearchBar({ value, onChange, placeholder }: TSearchBar.Props) {
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

  function onValueChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value ?? null);
  }

  function onBlur() {
    setInputFocus(false);
  }

  function onFocus() {
    setInputFocus(true);
  }

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
        })}
      >
        <ResponsiveOutlineWrapper isXl={isXl}>
          <div
            className={cn("flex h-12 w-full flex-row items-center gap-2 rounded-full px-4", {
              "bg-spaceBlue-900": !inputFocus,
              "bg-spacePurple-900": inputFocus,
            })}
          >
            <Icon
              remixName={"ri-search-line"}
              className={cn("text-2xl", { "text-spaceBlue-200": !inputFocus }, { "text-greyscale-50": inputFocus })}
            />
            <input
              placeholder={placeholder}
              className="h-8 w-full bg-transparent font-walsheim text-lg text-greyscale-50 outline-none placeholder:text-spaceBlue-200"
              value={value || ""}
              ref={textInput}
              onChange={onValueChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <button data-testid="clear-searchbar-button">
              <Icon
                remixName="ri-close-line"
                className={cn("text-2xl", {
                  hidden: !inputFocus && !value,
                  "text-greyscale-50": !inputFocus && value,
                  "text-purple-200": inputFocus,
                })}
                onClick={e => {
                  e.preventDefault();
                  onChange(null);
                }}
              />
            </button>
          </div>
        </ResponsiveOutlineWrapper>
      </div>
    </div>
  );
}

function ResponsiveOutlineWrapper({ children, isXl }: { isXl: boolean; children: ReactElement }) {
  return isXl ? children : <div className="w-full rounded-full border-2 border-transparent">{children}</div>;
}

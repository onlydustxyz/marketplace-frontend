import { Menu, Transition } from "@headlessui/react";
import { Fragment, useMemo } from "react";

import Button, { ButtonSize } from "src/components/Button";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import { cn } from "src/utils/cn";

import { ChoiceButtonProps } from "./ChoiceButton.type";

export const ChoiceButton = ({ choices, defaultOption, icon, ...rest }: ChoiceButtonProps) => {
  const defaultChoice = useMemo(() => {
    const findDefault = choices.find(choice => choice.name === defaultOption && !choice.disabled);
    if (!findDefault) {
      const findInNotDisabled = choices.find(choice => !choice.disabled);
      return findInNotDisabled;
    }
    return findDefault;
  }, [choices, defaultOption]);

  const availableChoice = useMemo(() => choices.filter(choice => !choice.disabled), [choices]);
  const otherChoices = choices.filter(choice => choice.name !== defaultChoice?.name);

  const isChoiceButton = availableChoice.length > 1;

  if (!defaultChoice) {
    return null;
  }

  return (
    <Menu as="div" className="relative z-[11] inline-block">
      <div className={cn("flex items-center justify-start gap-px shadow-button")}>
        <Button
          {...rest}
          className={cn("shadow-none !outline-none drop-shadow-none focus:outline-none active:outline-none", {
            "gap-[0.5px]": rest.size === ButtonSize.Sm || rest.size === ButtonSize.Xs,
            "rounded-r-none filter-none": isChoiceButton,
          })}
          disabled={rest.disabled || defaultChoice.disabled}
          onClick={defaultChoice.onClick}
        >
          {defaultChoice.label}
        </Button>
        {availableChoice.length > 1 && (
          <Menu.Button as="div">
            <Button
              {...rest}
              className={cn(
                "rounded-l-none px-2 shadow-none !outline-none filter-none focus:outline-none active:outline-none",
                {
                  "px-3": rest.size !== ButtonSize.Sm && rest.size !== ButtonSize.Xs,
                }
              )}
              disabled={rest.disabled || defaultChoice.disabled}
            >
              {icon || (
                <ArrowDownSLine
                  className={cn("text-sm text-black", {
                    "text-xl": rest.size !== ButtonSize.Sm && rest.size !== ButtonSize.Xs,
                  })}
                />
              )}
            </Button>
          </Menu.Button>
        )}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 top-full z-30 mt-2 w-56 origin-top-right overflow-hidden rounded-xl border border-card-background-light bg-greyscale-900 py-2 shadow-light focus:outline-none">
            {otherChoices.map(choice => (
              <Menu.Item
                as="div"
                key={choice.name}
                className={cn(
                  "text-body-s-bold flex cursor-pointer flex-row items-center gap-3 px-4 py-2 font-walsheim transition-colors hover:bg-greyscale-800/50",
                  {
                    "opacity-50 hover:bg-transparent": choice.disabled,
                  }
                )}
                onClick={choice.onClick}
                disabled={choice.disabled}
              >
                {choice.label}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  );
};

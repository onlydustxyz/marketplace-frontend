import { Checkbox } from "@nextui-org/react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";

import { Chip } from "src/components/Chip/Chip";
import { FieldInput } from "src/components/New/Field/Input";
import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TCheckboxItem } from "./checkbox-item.types";

export function CheckboxItem({
  title,
  list,
  icon,
  selected,
  onChange,
  value,
  withInput,
  withSelectedComponent,
  unselectable,
  tooltipToken,
}: TCheckboxItem.Props) {
  function onClick() {
    if (!unselectable) {
      onChange(value);
    }
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div layout={"size"} className="origin-top">
        <Card
          background={false}
          border={selected ? "heavy" : "light"}
          className={cn("p-4", {
            "pointer-events-none opacity-40": unselectable,
          })}
          onClick={onClick}
          noHover={unselectable}
        >
          <Flex justifyContent="between" alignItems="center" className="gap-1">
            <Flex justifyContent="start" alignItems="center" className="gap-4">
              <Chip className="h-8 w-8">
                <Icon {...icon} className={cn("h-4 w-4", icon.className)} />
              </Chip>
              <div>
                <Typography variant={"title-s"} className="mb-0.5 text-greyscale-50">
                  {title}
                </Typography>
                <ul className="list-inside list-disc">
                  {list.map((item, index) => (
                    <Typography key={index} variant={"body-s"} className="text-greyscale-200" as="li">
                      {item}
                    </Typography>
                  ))}
                </ul>
              </div>
            </Flex>
            {tooltipToken ? (
              <Tooltip content={<Translate token={tooltipToken} />} placement="left">
                <span className="pointer-events-auto cursor-default">
                  <Checkbox
                    radius="full"
                    isSelected={selected}
                    className="pointer-events-none"
                    classNames={{
                      wrapper: "after:bg-spacePurple-500",
                    }}
                  />
                </span>
              </Tooltip>
            ) : (
              <Checkbox
                radius="full"
                isSelected={selected}
                className="pointer-events-none"
                classNames={{
                  wrapper: "after:bg-spacePurple-500",
                }}
              />
            )}
          </Flex>
          {withInput ? (
            <AnimatePresence initial={false}>
              {selected && (
                <m.section
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className="w-full pt-5">
                    <FieldInput
                      autoFocus={true}
                      label={withInput.label}
                      name={`input-${value}`}
                      onChange={e => withInput?.onChange(e.target.value)}
                      value={withInput.value}
                    />
                  </div>
                </m.section>
              )}
            </AnimatePresence>
          ) : null}
          {withSelectedComponent ? (
            <AnimatePresence initial={false}>
              {selected && (
                <m.section
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  {withSelectedComponent}
                </m.section>
              )}
            </AnimatePresence>
          ) : null}
        </Card>
      </m.div>
    </LazyMotion>
  );
}

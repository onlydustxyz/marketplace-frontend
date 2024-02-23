import { Checkbox } from "@nextui-org/react";
import { motion } from "framer-motion";

import { Chip } from "src/components/Chip/Chip";
import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TCheckboxItem } from "./checkbox-item.types";

export function CheckboxItem({ title, icon, selected, onChange, value }: TCheckboxItem.Props) {
  function onClick() {
    onChange(value);
  }

  return (
    <motion.div layout={"size"} className="origin-top">
      <Card background={false} border={selected ? "heavy" : "light"} className="p-4" onClick={onClick}>
        <Flex justifyContent="between" alignItems="center" className="gap-1">
          <Flex justifyContent="start" alignItems="center" className="gap-4">
            <Chip className="h-8 w-8">
              <Icon {...icon} className={cn("h-4 w-4", icon.className)} />
            </Chip>

            <div>
              <Typography variant={"title-s"} className="mb-0.5 text-greyscale-50">
                {title}
              </Typography>
            </div>
          </Flex>

          <Checkbox
            radius="full"
            isSelected={selected}
            className="pointer-events-none"
            classNames={{
              wrapper: "after:bg-spacePurple-500",
            }}
          />
        </Flex>
      </Card>
    </motion.div>
  );
}

import { Checkbox } from "@nextui-org/react";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TCheckboxItem } from "./checkbox-item.types";

export function CheckboxItem({ title, list, icon, selected }: TCheckboxItem.Props) {
  console.log("selected", selected, title);
  return (
    <Card background={false} border="heavy" className="p-4">
      <Flex justifyContent="between" alignItems="center" className="gap-1">
        <Flex justifyContent="start" alignItems="center" className="gap-4">
          <Icon {...icon} />
          <div>
            <Typography variant={"title-s"} className="text-greyscale-50">
              {title}
            </Typography>
            <ul>
              {list.map((item, index) => (
                <Typography key={index} variant={"body-s"} className="text-greyscale-50">
                  {item}
                </Typography>
              ))}
            </ul>
          </div>
        </Flex>
        <Checkbox radius="full" isSelected={selected} className="pointer-events-none" />
      </Flex>
    </Card>
  );
}

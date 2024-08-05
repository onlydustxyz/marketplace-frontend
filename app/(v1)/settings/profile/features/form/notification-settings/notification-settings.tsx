import { Controller, useFormContext } from "react-hook-form";

import { Card } from "components/ds/card/card";
import { Input } from "components/ds/form/input/input";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

export function NotificationSettings() {
  const { control } = useFormContext();
  return (
    <Card background="base">
      <Flex direction="col" className="flex-1 gap-3">
        <Flex direction="col" className="flex-1 gap-1">
          <Typography variant="title-s" translate={{ token: "v2.pages.settings.profile.notificationSettings.title" }} />
          <Typography
            variant="body-s"
            className="text-spaceBlue-200"
            translate={{ token: "v2.pages.settings.profile.notificationSettings.subtitle" }}
          />
        </Flex>
        <Controller
          name="contactEmail"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              {...fieldState}
              startContent={<Icon remixName="ri-mail-line" className="pointer-events-none" />}
            />
          )}
        />
      </Flex>
    </Card>
  );
}

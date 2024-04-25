import { Controller, useFormContext } from "react-hook-form";

import FormSelect from "src/components/FormSelect";

import { Card } from "components/ds/card/card";
import { Toggle } from "components/ds/form/toggle/toggle";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

import { TProfileForm } from "../form.types";

export function FormWeeklyAllocatedTime() {
  const { T } = useIntl();
  const { control } = useFormContext();

  return (
    <Card background="base">
      <Flex direction="col" className="gap-5">
        <Flex direction="col" className="gap-1">
          <Typography variant="title-s" translate={{ token: "v2.pages.settings.profile.weeklyAllocatedTime.title" }} />

          <Typography
            variant="body-s"
            translate={{ token: "v2.pages.settings.profile.weeklyAllocatedTime.subtitle" }}
            className="text-spaceBlue-200"
          />
        </Flex>

        <Flex direction="col" className="gap-4">
          <Controller
            name="weeklyAllocatedTime"
            control={control}
            render={({ field, fieldState }) => (
              <FormSelect
                {...field}
                {...fieldState}
                name="weeklyAllocatedTime"
                options={Object.entries(TProfileForm.ALLOCATED_TIME).map(([value]) => ({
                  value,
                  label: T(`v2.commons.enums.me.weeklyAllocatedTime.${value}`),
                }))}
                control={control}
              />
            )}
          />

          <Controller
            name="lookingForAJob"
            control={control}
            render={({ field, fieldState }) => (
              <Toggle ariaLabel="lookingForAJob" {...field} {...fieldState}>
                <Typography
                  variant="body-s"
                  translate={{
                    token: "v2.pages.settings.profile.weeklyAllocatedTime.lookingForAJob",
                  }}
                />
              </Toggle>
            )}
          />
        </Flex>
      </Flex>
    </Card>
  );
}

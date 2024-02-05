import { Controller, useFormContext } from "react-hook-form";

import FormSelect from "src/components/FormSelect";
import { useIntl } from "src/hooks/useIntl";

import { Card } from "components/ds/card/card";
import { Toggle } from "components/ds/form/toggle/toggle";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TProfileForm } from "../form.types";

export function FormWeeklyAllocatedTime() {
  const { T } = useIntl();
  const { control } = useFormContext();

  const weeklyAllocatedTime: { [key in TProfileForm.ALLOCATED_TIME]: string } = {
    [TProfileForm.ALLOCATED_TIME.NONE]: T("v2.pages.settings.publicProfile.weeklyAllocatedTime.form.none"),
    [TProfileForm.ALLOCATED_TIME.LESS_THAN_ONE_DAY]: T(
      "v2.pages.settings.publicProfile.weeklyAllocatedTime.form.lessThanOneDay"
    ),
    [TProfileForm.ALLOCATED_TIME.ONE_TO_THREE_DAYS]: T(
      "v2.pages.settings.publicProfile.weeklyAllocatedTime.form.oneToThreeDays"
    ),
    [TProfileForm.ALLOCATED_TIME.GREATER_THAN_THREE_DAYS]: T(
      "v2.pages.settings.publicProfile.weeklyAllocatedTime.form.moreThanThreeDays"
    ),
  };

  return (
    <Card background="base">
      <Flex direction="col" className="gap-5">
        <Flex direction="col" className="gap-1">
          <Typography
            variant="title-s"
            translate={{ token: "v2.pages.settings.publicProfile.weeklyAllocatedTime.title" }}
          />

          <Typography
            variant="body-s"
            translate={{ token: "v2.pages.settings.publicProfile.weeklyAllocatedTime.subtitle" }}
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
                options={Object.entries(weeklyAllocatedTime).map(([value, label]) => ({ value, label }))}
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
                    token: "v2.pages.settings.publicProfile.weeklyAllocatedTime.lookingForAJob",
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

import { Controller, useFormContext } from "react-hook-form";

import TechnologiesSelect from "src/components/TechnologiesSelect";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

export function FormTechnologies() {
  const { control } = useFormContext();

  return (
    <Card background="base">
      <Flex direction="col" className="gap-5">
        <Flex direction="col" className="gap-1">
          <Typography variant="title-s" translate={{ token: "v2.pages.settings.profile.technologies.title" }} />

          <Typography
            variant="body-s"
            translate={{ token: "v2.pages.settings.profile.technologies.subtitle" }}
            className="text-spaceBlue-200"
          />
        </Flex>

        <Controller
          name="technologies"
          control={control}
          render={({ field }) => <TechnologiesSelect technologies={field.value} setTechnologies={field.onChange} />}
        />
      </Flex>
    </Card>
  );
}

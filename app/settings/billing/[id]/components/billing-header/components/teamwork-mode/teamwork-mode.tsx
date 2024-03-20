import { useState } from "react";

import BillingProfilesApi from "src/api/BillingProfiles";
import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

import { Toggle } from "components/ds/form/toggle/toggle";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TTeamworkMode } from "./teamwork-mode.types";

export function TeamworkMode({ type, isSwitchableToSelfEmployed, id }: TTeamworkMode.Props) {
  const [isChecked, setIsChecked] = useState(type === BillingProfilesTypes.type.Company);

  const disabled = !isSwitchableToSelfEmployed && type === BillingProfilesTypes.type.Company;

  const { mutate: updateBillingType } = BillingProfilesApi.mutations.useUpdateBillingType({
    params: {
      billingProfileId: id,
    },
  });

  const handleToggle = () => {
    setIsChecked(!isChecked);

    updateBillingType({
      type: isChecked ? BillingProfilesTypes.type.SelfEmployed : BillingProfilesTypes.type.Company,
    });
  };

  return (
    <Flex alignItems="center" className="gap-1">
      <Tooltip placement="bottom" content={<Translate token="v2.pages.settings.billing.header.teamwork.tooltip" />}>
        <Icon remixName="ri-information-line" className="text-spaceBlue-200" />
      </Tooltip>

      <Tooltip
        placement="bottom"
        isDisabled={!disabled}
        content={<Translate token="v2.pages.settings.billing.header.teamwork.unswitchable" />}
      >
        <Toggle ariaLabel="teamwork-mode" onChange={handleToggle} value={isChecked} reverse disabled={disabled}>
          <Typography
            variant="body-s"
            translate={{
              token: "v2.pages.settings.billing.header.teamwork.title",
            }}
            className="whitespace-nowrap text-spaceBlue-200"
          />
        </Toggle>
      </Tooltip>
    </Flex>
  );
}

import BillingProfilesApi from "src/api/BillingProfiles";
import { BillingProfilesTypes } from "src/api/BillingProfiles/type";
import useMutationAlert from "src/api/useMutationAlert";
import { Spinner } from "src/components/Spinner/Spinner";

import { Toggle } from "components/ds/form/toggle/toggle";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

import { TTeamworkMode } from "./teamwork-mode.types";

export function TeamworkMode({ type, isSwitchableToSelfEmployed, id }: TTeamworkMode.Props) {
  const { T } = useIntl();

  const {
    mutate: updateBillingType,
    isPending,
    ...restUpdateBillingType
  } = BillingProfilesApi.mutations.useUpdateBillingType({
    params: {
      billingProfileId: id,
    },
  });

  const isChecked = type === BillingProfilesTypes.type.Company;
  const disabled = !isSwitchableToSelfEmployed && isChecked;

  useMutationAlert({
    mutation: restUpdateBillingType,
    error: {
      message: T("v2.pages.settings.billing.header.teamwork.alert.error"),
    },
  });

  const handleToggle = () => {
    updateBillingType({
      type: isChecked ? BillingProfilesTypes.type.SelfEmployed : BillingProfilesTypes.type.Company,
    });
  };

  if (isPending) {
    return (
      <Flex alignItems="center" className="gap-1" justifyContent="end">
        <Spinner />
      </Flex>
    );
  }

  return (
    <Flex alignItems="center" className="gap-1" justifyContent="end">
      <Tooltip
        placement="bottom"
        hasMaxWidth
        content={<Translate token="v2.pages.settings.billing.header.teamwork.tooltip" />}
      >
        <Icon remixName="ri-information-line" className="text-spaceBlue-200" />
      </Tooltip>

      <Tooltip
        placement="bottom-end"
        hasMaxWidth
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

import { useState } from "react";

import { Spinner } from "src/components/Spinner/Spinner";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { RadioGroupCustom } from "components/ds/form/radio-group-custom/radio-group-custom";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { CheckboxItem } from "../billing-create-stack/components/checkbox-item/checkbox-item";
import { TBillingInviteTeamMember } from "./billing-invite-team-member.types";

export function BillingInviteTeamMember() {
  const [type, setType] = useState<TBillingInviteTeamMember.Choice | "">("");

  const isLoading = false;
  const isDisabled = false;

  const onSubmit = () => {
    console.log("submit");
  };

  function onChoiceChange(value: TBillingInviteTeamMember.Choice | "") {
    setType(value);
  }

  return (
    <Flex direction="col" justifyContent="between" className="h-full">
      <Flex direction="col" className="h-full px-4 pb-8">
        <div className="mb-8">
          <Typography variant="title-m" translate={{ token: "v2.pages.settings.billingInviteTeamMember.title" }} />
        </div>

        <Card background={false}>
          <Flex direction="col" className="gap-5">
            <Flex direction="col" className="gap-2">
              <Typography
                variant="body-s-bold"
                translate={{ token: "v2.pages.settings.billingInviteTeamMember.fields.contributor.title" }}
                className="text-greyscale-300"
              />
            </Flex>

            <p>Search bar</p>

            <Flex direction="col" className="gap-2">
              <Typography
                variant="body-s-bold"
                translate={{ token: "v2.pages.settings.billingInviteTeamMember.fields.role.title" }}
                className="text-greyscale-300"
              />

              <RadioGroupCustom<TBillingInviteTeamMember.Choice | ""> onChange={onChoiceChange} value={type}>
                {({ value, onChange }) => [
                  <CheckboxItem
                    key="admin"
                    title={<Translate token="v2.pages.settings.billing_create.fields.individual.title" />}
                    icon={{ remixName: "ri-vip-crown-line" }}
                    disabled={isDisabled}
                    onChange={onChange}
                    selected={value === "admin"}
                    value="admin"
                  />,
                  <CheckboxItem
                    key="member"
                    title={<Translate token="v2.pages.settings.billing_create.fields.selfEmployed.title" />}
                    icon={{ remixName: "ri-team-line" }}
                    disabled={isDisabled}
                    onChange={onChange}
                    selected={value === "member"}
                    value="member"
                  />,
                ]}
              </RadioGroupCustom>
            </Flex>
          </Flex>
        </Card>
      </Flex>

      <div className="absolute bottom-0 left-0 w-full bg-greyscale-900">
        <Flex
          alignItems="center"
          justifyContent="between"
          className="h-auto w-full gap-5 border-t border-card-border-light bg-card-background-light px-8 py-6"
        >
          {/* Empty div to keep the flex layout */}
          {isLoading ? <Spinner /> : <div />}
          <Button variant="primary" size="l" disabled={isDisabled} onClick={onSubmit}>
            <Icon remixName="ri-send-plane-2-line" size={24} />
            <Translate token="v2.pages.settings.billingInviteTeamMember.buttons.save" />
          </Button>
        </Flex>
      </div>
    </Flex>
  );
}

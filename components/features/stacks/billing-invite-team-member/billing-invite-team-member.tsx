import { useState } from "react";

import { BillingProfilesTypes } from "src/api/BillingProfiles/type";
import { Spinner } from "src/components/Spinner/Spinner";
import { ContributorResponse } from "src/types";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { RadioGroupCustom } from "components/ds/form/radio-group-custom/radio-group-custom";
import { SearchContributor } from "components/features/search-contributor/search-contributor";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TBillingInviteTeamMember } from "./billing-invite-team-member.types";
import { CheckboxItem } from "./components/checkbox-item/checkbox-item";

export function BillingInviteTeamMember() {
  const [githubUser, setGithubUser] = useState<ContributorResponse["githubUserId"] | undefined>();
  const [role, setRole] = useState<TBillingInviteTeamMember.Choice | "">("");
  const isLoading = false;
  const isDisabled = false;

  const onSubmit = () => {
    console.log("submit", githubUser);
  };

  function onChoiceChange(value: TBillingInviteTeamMember.Choice | "") {
    setRole(value);
  }

  function onContributorChange(contributors: ContributorResponse[]) {
    if (contributors?.[0]?.githubUserId) {
      setGithubUser(contributors?.[0]?.githubUserId);
    }
  }

  return (
    <Flex direction="col" justifyContent="between" className="h-full">
      <Flex direction="col" className="h-full px-4 pb-8">
        <div className="mb-8">
          <Typography variant="title-m" translate={{ token: "v2.pages.stacks.billingInviteTeamMember.title" }} />
        </div>

        <Card background={false}>
          <Flex direction="col" className="gap-5">
            <Flex direction="col" className="gap-2">
              <Typography
                variant="body-s-bold"
                translate={{ token: "v2.pages.stacks.billingInviteTeamMember.fields.contributor.title" }}
                className="text-greyscale-300"
              />

              <SearchContributor onSelectContributors={onContributorChange} />
            </Flex>

            <Flex direction="col" className="gap-2">
              <Typography
                variant="body-s-bold"
                translate={{ token: "v2.pages.stacks.billingInviteTeamMember.fields.role.title" }}
                className="text-greyscale-300"
              />

              <RadioGroupCustom<TBillingInviteTeamMember.Choice | ""> onChange={onChoiceChange} value={role}>
                {({ value, onChange }) => [
                  <CheckboxItem
                    key={BillingProfilesTypes.ROLE.ADMIN}
                    title={
                      <Translate token="v2.pages.stacks.billingInviteTeamMember.fields.role.options.admin.title" />
                    }
                    description={
                      <Translate token="v2.pages.stacks.billingInviteTeamMember.fields.role.options.admin.description" />
                    }
                    icon={{ remixName: "ri-vip-crown-line" }}
                    onChange={onChange}
                    selected={value === BillingProfilesTypes.ROLE.ADMIN}
                    value={BillingProfilesTypes.ROLE.ADMIN}
                  />,
                  <CheckboxItem
                    key={BillingProfilesTypes.ROLE.MEMBER}
                    title={
                      <Translate token="v2.pages.stacks.billingInviteTeamMember.fields.role.options.member.title" />
                    }
                    description={
                      <Translate token="v2.pages.stacks.billingInviteTeamMember.fields.role.options.member.description" />
                    }
                    icon={{ remixName: "ri-team-line" }}
                    onChange={onChange}
                    selected={value === BillingProfilesTypes.ROLE.MEMBER}
                    value={BillingProfilesTypes.ROLE.MEMBER}
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
            <Translate token="v2.pages.stacks.billingInviteTeamMember.buttons.save" />
          </Button>
        </Flex>
      </div>
    </Flex>
  );
}

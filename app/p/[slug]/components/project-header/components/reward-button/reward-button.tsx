import { FilloutStandardEmbed } from "@fillout/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Channel } from "src/App/Stacks/ContributorProfileSidePanel/EditView/types";
import MeApi from "src/api/me";
import { ButtonOnBackground, ButtonSize } from "src/components/Button";
import { ChoiceButton } from "src/components/New/Buttons/ChoiceButton/ChoiceButton";
import SidePanel from "src/components/SidePanel";
import { useIntl } from "src/hooks/useIntl";

import { Icon } from "components/layout/icon/icon";

import { NEXT_ROUTER } from "constants/router";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import { TRewardButton } from "./reward-button.types";

// TODO: Refacto choice button
export function RewardButton({ project }: TRewardButton.Props) {
  const { T } = useIntl();
  const { user } = useCurrentUser();
  const { data: userProfile } = MeApi.queries.useGetMyProfileInfo({});
  const router = useRouter();
  const isRewardDisabled = !project?.hasRemainingBudget;
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const findContact = (channel: Channel) => {
    const findContact = userProfile?.contacts?.find(contact => contact.channel === channel);
    return findContact?.contact || undefined;
  };

  return (
    <>
      <ChoiceButton
        choices={[
          {
            name: "reward",
            label: T("project.rewardButton.full"),
            disabled: isRewardDisabled,
            onClick: () => router.push(NEXT_ROUTER.projects.details.rewards.new(project?.slug)),
          },
          {
            name: "apply",
            label: T("project.addBudgetButton"),
            onClick: () => setIsApplyOpen(true),
          },
        ]}
        defaultOption="reward"
        onBackground={ButtonOnBackground.Blue}
        size={ButtonSize.Sm}
        icon={<Icon remixName="ri-arrow-down-s-line" size={14} className="text-black" />}
      />

      <SidePanel open={isApplyOpen} setOpen={setIsApplyOpen}>
        <FilloutStandardEmbed
          filloutId="wrRsfYKaDJus"
          inheritParameters
          parameters={{
            lead_id: user?.id,
            lead_first_name: user?.firstName,
            lead_last_name: user?.lastName,
            lead_github: user?.login,
            lead_telegram: findContact(Channel.Telegram),
            lead_email: findContact(Channel.Email),
            project_id: project.id,
            project_name: project.name,
          }}
        />
      </SidePanel>
    </>
  );
}

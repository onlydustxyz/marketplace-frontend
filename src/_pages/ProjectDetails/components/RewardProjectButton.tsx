import { FilloutStandardEmbed } from "@fillout/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Channel } from "src/App/Stacks/ContributorProfileSidePanel/EditView/types";
import { components } from "src/__generated/api";
import MeApi from "src/api/me";
import { ButtonOnBackground, ButtonSize } from "src/components/Button";
import { ChoiceButton } from "src/components/New/Buttons/ChoiceButton/ChoiceButton";
import SidePanel from "src/components/SidePanel";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import { cn } from "src/utils/cn";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";
import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

type RewardProjectButtonProps = { project: components["schemas"]["ProjectResponse"]; size?: ButtonSize };

export function RewardProjectButton({ project, size = ButtonSize.Sm }: RewardProjectButtonProps) {
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
        size={size}
        icon={
          <ArrowDownSLine
            className={cn("text-sm text-black", {
              "text-xl": size !== ButtonSize.Sm && size !== ButtonSize.Xs,
            })}
          />
        }
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
            lead_email: userProfile?.contactEmail,
            project_id: project.id,
            project_name: project.name,
          }}
        />
      </SidePanel>
    </>
  );
}

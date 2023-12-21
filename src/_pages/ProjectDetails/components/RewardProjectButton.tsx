import { FilloutStandardEmbed } from "@fillout/react";
import { useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import { Channel } from "src/App/Stacks/ContributorProfileSidePanel/EditView/types";
import { components } from "src/__generated/api";
import MeApi from "src/api/me";
import Button, { ButtonOnBackground, ButtonSize } from "src/components/Button";
import { ChoiceButton } from "src/components/New/Buttons/ChoiceButton/ChoiceButton";
import SidePanel from "src/components/SidePanel";
import { withTooltip } from "src/components/Tooltip";
import { useAuth } from "src/hooks/useAuth";

import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import { cn } from "src/utils/cn";

type RewardProjectButtonProps = { project: components["schemas"]["ProjectResponse"]; size?: ButtonSize };

export function RewardProjectButton({ project, size = ButtonSize.Sm }: RewardProjectButtonProps) {
  const { T } = useIntl();
  const { user } = useAuth();
  const { data: userInfo } = MeApi.queries.useGetMyPayoutInfo({});
  const { data: userProfile } = MeApi.queries.useGetMyProfileInfo({});
  const navigate = useNavigate();
  const canReward = !!project?.hasRemainingBudget;
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const findContact = (channel: Channel) => {
    const findContact = userProfile?.contacts?.find(contact => contact.channel === channel);
    return findContact?.contact || undefined;
  };

  if (import.meta.env.VITE_CAN_ALLOW_APPLY_FOR_BUDGET !== "true") {
    return (
      <Button
        disabled={canReward}
        onBackground={ButtonOnBackground.Blue}
        className="flex-1 md:flex-initial"
        size={size}
        {...withTooltip(T("contributor.table.noBudgetLeft"), {
          visible: canReward,
        })}
        onClick={() =>
          navigate(
            generatePath(`${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Rewards}/${ProjectRewardsRoutePaths.New}`, {
              projectKey: project.slug,
            })
          )
        }
      >
        {T("project.rewardButton.full")}
      </Button>
    );
  }

  return (
    <>
      <ChoiceButton
        choices={[
          {
            name: "reward",
            label: T("project.rewardButton.full"),
            disabled: !canReward,
            onClick: () =>
              navigate(
                generatePath(
                  `${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Rewards}/${ProjectRewardsRoutePaths.New}`,
                  {
                    projectKey: project?.slug,
                  }
                )
              ),
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
            lead_first_name: userInfo?.person?.firstname,
            lead_last_name: userInfo?.person?.lastname,
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

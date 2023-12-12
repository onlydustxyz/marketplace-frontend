import { FilloutSliderEmbed } from "@fillout/react";
import { useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import { Channel } from "src/App/Stacks/ContributorProfileSidePanel/EditView/types";
import { components } from "src/__generated/api";
import MeApi from "src/api/me";
import Button, { ButtonOnBackground, ButtonSize } from "src/components/Button";
import { withTooltip } from "src/components/Tooltip";
import { useAuth } from "src/hooks/useAuth";

import { useIntl } from "src/hooks/useIntl";

type RewardProjectButtonProps = { project: components["schemas"]["ProjectResponse"] };

export function RewardProjectButton({ project }: RewardProjectButtonProps) {
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

  if (!canReward) {
    return (
      <>
        <Button
          disabled={canReward}
          onBackground={ButtonOnBackground.Blue}
          className="flex-1 lg:flex-initial"
          size={ButtonSize.Sm}
          onClick={() => setIsApplyOpen(true)}
        >
          {T("project.applyForBudgetButton")}
        </Button>
        {isApplyOpen && (
          <FilloutSliderEmbed
            filloutId="wrRsfYKaDJus"
            inheritParameters
            parameters={{
              lead_id: user?.id,
              lead_first_name: userInfo?.person?.firstname,
              lead_last_name: userInfo?.person?.lastname,
              lead_Github: user?.login,
              lead_Telegram: findContact(Channel.Telegram),
              lead_email: findContact(Channel.Email),
              project_id: project.id,
              project_name: project.name,
            }}
            onClose={() => setIsApplyOpen(false)}
            sliderDirection="right"
          />
        )}
      </>
    );
  }

  return (
    <Button
      disabled={!canReward}
      onBackground={ButtonOnBackground.Blue}
      className="flex-1 lg:flex-initial"
      size={ButtonSize.Sm}
      {...withTooltip(T("contributor.table.noBudgetLeft"), {
        visible: !canReward,
      })}
      onClick={() =>
        navigate(
          generatePath(`${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Rewards}/${ProjectRewardsRoutePaths.New}`, {
            projectKey: project?.slug,
          })
        )
      }
    >
      {T("project.rewardButton.full")}
    </Button>
  );
}

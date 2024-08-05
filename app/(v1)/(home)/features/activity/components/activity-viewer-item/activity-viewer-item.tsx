import { useMemo } from "react";

import { ActivityContent } from "app/(v1)/(home)/features/activity/components/activity-content/activity-content";
import { TActivityContent } from "app/(v1)/(home)/features/activity/components/activity-content/activity-content.types";

import { AvailableConversion } from "src/components/Currency/AvailableConversion";

import { Avatar } from "components/ds/avatar/avatar";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { TActivityViewerItem } from "./activity-viewer-item.types";

export function ActivityViewerItem({ data, lastElement }: TActivityViewerItem.Props) {
  const ContentProps: TActivityContent.Props | undefined = useMemo(() => {
    if (data.type === "REWARD_CREATED" && data.rewardCreated) {
      const { amount, recipient, project } = data.rewardCreated;
      return {
        lastElement,
        mainAvatar: {
          shape: "square",
          src: project.logoUrl,
        },
        from: project.name,
        action: <Translate token={"v2.pages.home.activity.actions.REWARD_CREATED"} />,
        to: (
          <Avatar.Labelled avatarProps={{ src: recipient.login, shape: "circle", size: "xs" }}>
            {recipient.login}
          </Avatar.Labelled>
        ),
        badge: <Icon remixName="ri-medal-2-fill" className="text-orange-400" size={20} />,
        timestamp: data.timestamp,
        details: (
          <AvailableConversion
            currency={{
              currency: amount.currency,
              amount: amount.amount,
              dollar: undefined,
            }}
          />
        ),
      };
    }

    if (data.type === "PULL_REQUEST" && data.pullRequest) {
      const { author, project } = data.pullRequest;
      return {
        lastElement,
        mainAvatar: {
          shape: "circle",
          src: author.avatarUrl,
        },
        from: author.login,
        action: <Translate token={"v2.pages.home.activity.actions.PULL_REQUEST"} />,
        to: <Translate token={"v2.pages.home.activity.actions_details.PULL_REQUEST"} />,
        badge: <Icon remixName="ri-git-merge-line" className="text-purple-500" size={20} />,
        timestamp: data.timestamp,
        details: (
          <Avatar.Labelled avatarProps={{ src: project.logoUrl, shape: "square", size: "xs" }}>
            {project.name}
          </Avatar.Labelled>
        ),
      };
    }

    if (data.type === "REWARD_CLAIMED" && data.rewardClaimed) {
      const { amount, recipient, project } = data.rewardClaimed;
      return {
        lastElement,
        mainAvatar: {
          shape: "circle",
          src: recipient.avatarUrl,
        },
        from: recipient.login,
        action: <Translate token={"v2.pages.home.activity.actions.REWARD_CLAIMED"} />,
        to: (
          <AvailableConversion
            currency={{
              currency: amount.currency,
              amount: amount.amount,
              dollar: undefined,
            }}
          />
        ),
        badge: <Icon remixName="ri-medal-2-fill" className="text-spaceBlue-400" size={20} />,
        timestamp: data.timestamp,
        details: (
          <Avatar.Labelled avatarProps={{ src: project.logoUrl, shape: "square", size: "xs" }}>
            {project.name}
          </Avatar.Labelled>
        ),
      };
    }

    if (data.type === "PROJECT_CREATED" && data.projectCreated) {
      const { createdBy, project } = data.projectCreated;
      return {
        lastElement,
        mainAvatar: {
          shape: "square",
          src: project.logoUrl,
        },
        from: project.name,
        action: <Translate token={"v2.pages.home.activity.actions.PROJECT_CREATED"} />,
        to: (
          <Avatar.Labelled avatarProps={{ src: createdBy.avatarUrl, shape: "circle", size: "xs" }}>
            {createdBy.login}
          </Avatar.Labelled>
        ),
        badge: <Icon remixName="ri-add-line" className="text-spaceBlue-500" size={20} />,
        timestamp: data.timestamp,
      };
    }

    return undefined;
  }, [data]);

  return ContentProps ? <ActivityContent {...ContentProps} /> : null;
}

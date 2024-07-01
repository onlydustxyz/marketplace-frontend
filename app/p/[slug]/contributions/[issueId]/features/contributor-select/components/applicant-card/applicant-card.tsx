import { useMemo } from "react";

import { cn } from "src/utils/cn";

import { Avatar } from "components/atoms/avatar";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TApplicantCard } from "./applicant-card.types";

export function ApplicantCard({
  user,
  recommandationScore,
  selectedUser,
  handleSelectUser,
  applicationId,
}: TApplicantCard.Props) {
  const recommandationScoreVariant = useMemo(() => {
    if (recommandationScore >= 80) return "success";
    if (recommandationScore >= 30) return "warning";
    return "danger";
  }, [recommandationScore]);

  return (
    <Flex
      as="button"
      alignItems="center"
      justifyContent="between"
      width="full"
      className={cn("gap-4 rounded-lg border border-transparent p-2 hover:border-spaceBlue-50", {
        "bg-card-background-medium": selectedUser === user.githubUserId,
      })}
      onClick={() => handleSelectUser(user.githubUserId, applicationId)}
    >
      <Flex alignItems="center" className="gap-3">
        <Avatar shape="round" size="s" src={user.avatarUrl} />

        <Typography variant="title-s" className="line-clamp-1 text-left text-spaceBlue-100">
          {user.login}
        </Typography>
      </Flex>

      <Typography
        variant="body-m-bold"
        className={cn({
          "text-struggleBadge-bar-solid-green": recommandationScoreVariant === "success",
          "text-orange-500": recommandationScoreVariant === "warning",
          "text-github-red-light": recommandationScoreVariant === "danger",
        })}
      >
        {recommandationScore}%
      </Typography>
    </Flex>
  );
}

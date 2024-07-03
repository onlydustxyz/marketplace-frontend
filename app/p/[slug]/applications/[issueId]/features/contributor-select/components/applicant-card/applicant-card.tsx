import { rankCategoryEmojiMapping } from "api-client/resources/users/types";
import { getOrdinalSuffix } from "utils/profile/ordinal-position-suffix";

import { cn } from "src/utils/cn";

import { Avatar } from "components/atoms/avatar";
import { Typo } from "components/atoms/typo";
import { Emoji } from "components/layout/emoji/emoji";
import { Flex } from "components/layout/flex/flex";

import { TApplicantCard } from "./applicant-card.types";

export function ApplicantCard({
  user,
  selectedUser,
  handleSelectUser,
  applicationId,
  rankCategory,
  rank,
}: TApplicantCard.Props) {
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

        <Typo size={"m"} variant={"brand"} classNames={{ base: "line-clamp-1 text-left" }}>
          {user.login}
        </Typo>
      </Flex>

      <Flex alignItems={"center"} justifyContent={"end"} className="gap-1">
        <Emoji symbol={rankCategoryEmojiMapping[rankCategory]} label="rank emoji" />
        <Typo size={"m"} variant={"brand"} classNames={{ base: "line-clamp-1 text-left text-spaceBlue-100" }}>
          {getOrdinalSuffix(rank)}
        </Typo>
      </Flex>
    </Flex>
  );
}

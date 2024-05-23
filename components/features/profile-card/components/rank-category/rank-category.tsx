"use client";

import { rankCategoryEmojiMapping, rankCategoryMapping } from "api-client/resources/users/types";
import { useState } from "react";

import { Popover } from "components/ds/modals/popover/popover";
import { TRankCategory } from "components/features/profile-card/components/rank-category/rank-category.types";
import { BaseLink } from "components/layout/base-link/base-link";
import { Emoji } from "components/layout/emoji/emoji";
import { Typography } from "components/layout/typography/typography";

function PopoverContent() {
  return (
    <Typography
      variant={"body-s"}
      translate={{ token: "v2.features.profileCard.rankExplanation.description" }}
      className="flex gap-1"
    >
      <BaseLink href="https://blog.onlydust.com/changelog/contributors-profile-more/">
        <Typography
          variant={"body-s"}
          translate={{ token: "v2.features.profileCard.rankExplanation.link" }}
          className="transition-all hover:text-spacePurple-500"
        />
      </BaseLink>
    </Typography>
  );
}

export function RankCategory({ rankCategory, hasPopover }: TRankCategory.Props) {
  const [isOpen, setIsOpen] = useState(false);
  if (!rankCategory) return null;

  return (
    <Popover
      placement="top-start"
      content={<PopoverContent />}
      triggerScaleOnOpen={false}
      isOpen={isOpen && hasPopover}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(false)}
      classNames={{ content: "p-4" }}
    >
      <div className="flex items-center gap-1">
        <Emoji symbol={rankCategoryEmojiMapping[rankCategory]} label="rank emoji" />
        <Typography
          variant="title-s"
          className="line-clamp-2 text-spaceBlue-100"
          translate={{ token: rankCategoryMapping[rankCategory] }}
        />
      </div>
    </Popover>
  );
}

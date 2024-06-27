import { useParams } from "next/navigation";

import { Button } from "components/ds/button/button";
import { BaseLink } from "components/layout/base-link/base-link";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { ContributionHeaderLoading } from "./contribution-header.loading";
import { TContributionHeader } from "./contribution-header.types";

export function ContributionHeader({ title }: TContributionHeader.Props) {
  const { slug = "" } = useParams<{ slug?: string }>();

  if (title.isLoading) {
    return <ContributionHeaderLoading />;
  }

  return (
    <Flex alignItems="center" className="gap-2">
      <BaseLink href={NEXT_ROUTER.projects.details.contributions.root(slug)} className="flex items-center gap-2">
        <Button iconOnly variant="secondary" size="s">
          <Icon remixName="ri-arrow-left-s-line" />
        </Button>
      </BaseLink>

      <Typography variant="title-m">{title.content}</Typography>
    </Flex>
  );
}

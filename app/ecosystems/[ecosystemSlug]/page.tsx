import { ProjectGoodFirstIssues } from "app/ecosystems/[ecosystemSlug]/features/project-good-first-issues/project-good-first-issues";

import { Button } from "components/ds/button/button";
import { BaseLink } from "components/layout/base-link/base-link";
import { Container } from "components/layout/container/container";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

export default function EcosystemDetailPage() {
  return (
    <div className={"grid gap-8 lg:gap-10"}>
      <div>
        <Container>
          <div className={"flex items-center gap-4"}>
            <BaseLink href={NEXT_ROUTER.ecosystems.root}>
              <Button as={"div"} variant={"secondary"} size={"s"} iconOnly>
                <Icon remixName={"ri-arrow-left-s-line"} size={16} />
              </Button>
            </BaseLink>

            <Typography variant={"title-l"} className={"lg:hidden"}>
              PROJECT NAME
            </Typography>
          </div>
        </Container>
      </div>
      <ProjectGoodFirstIssues />
    </div>
  );
}

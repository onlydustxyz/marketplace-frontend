import { usersApiClient } from "api-client/resources/users";

import { MostActive } from "app/(v1)/p/[slug]/applications/[issueId]/features/contributor-details/components/most-active/most-active";

import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TMostActiveEcosystems } from "./most-active-ecosystems.types";

export function MostActiveEcosystems({ githubId }: TMostActiveEcosystems.Props) {
  const { data } = usersApiClient.queries.useGetUserPublicEcosystemsByGithubId({
    pathParams: { githubId },
    pagination: {
      pageSize: 3,
      pageIndex: 0,
    },
  });

  if (!data?.ecosystems?.length) return null;

  return (
    <Flex direction="col" className="gap-3" width="full">
      <Flex alignItems="center" className="gap-2">
        <Icon remixName="ri-global-line" size={20} />
        <Typography translate={{ token: "v2.pages.publicProfile.header.ecosystems.title" }} variant="body-m-bold" />
      </Flex>
      <div className="grid grid-cols-3 gap-3">
        {data.ecosystems.map(ecosystem => (
          <MostActive
            key={ecosystem.ecosystem.name}
            logoUrl={ecosystem.ecosystem.logoUrl}
            name={ecosystem.ecosystem.name}
            status={ecosystem.contributingStatus}
          />
        ))}
      </div>
    </Flex>
  );
}

import { usersApiClient } from "api-client/resources/users";

import { TMostActiveEcosystems } from "app/p/[slug]/applications/[issueId]/features/contributor-details/components/most-active-ecosystems/most-active-ecosystems.types";
import { MostActive } from "app/p/[slug]/applications/[issueId]/features/contributor-details/components/most-active/most-active";

import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

export function MostActiveLanguages({ githubId }: TMostActiveEcosystems.Props) {
  const { data } = usersApiClient.queries.useGetUserPublicLanguagesByGithubId({
    pathParams: { githubId },
    pagination: {
      pageSize: 3,
      pageIndex: 0,
    },
  });

  if (!data?.languages?.length) return null;

  return (
    <Flex direction="col" className="gap-3" width="full">
      <Flex alignItems="center" className="gap-2">
        <Icon remixName="ri-code-s-slash-line" size={20} />
        <Typography translate={{ token: "v2.pages.publicProfile.header.languages.title" }} variant="body-m-bold" />
      </Flex>
      <div className="flex w-full gap-3">
        {data.languages.map(language => (
          <MostActive
            key={language.language.name}
            logoUrl={language.language.logoUrl}
            name={language.language.name}
            status={language.contributingStatus}
          />
        ))}
      </div>
    </Flex>
  );
}

import { ContributionItem } from "app/migration/u/[githubLogin]/components/contribution-item/contribution-item";
import { contributionsListMock } from "app/migration/u/[githubLogin]/components/contribution-list/contribution-list.mock";

import { TContributionList } from "./contribution-list.types";

export function ContributionList({ children }: TContributionList.Props) {
  const data = { contributions: contributionsListMock };
  return (
    <div>
      {data.contributions.map(contribution => (
        <ContributionItem
          contribution={contribution}
          key={contribution.id}
          project={{
            name: contribution.project.name,
            slug: contribution.project.slug,
            logoUrl: contribution.project.logoUrl,
          }}
        />
      ))}
    </div>
  );
}

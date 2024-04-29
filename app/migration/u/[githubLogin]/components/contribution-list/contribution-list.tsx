import { ContributionItem } from "app/migration/u/[githubLogin]/components/contribution-item/contribution-item";
import { contributionsListMock } from "app/migration/u/[githubLogin]/components/contribution-list/contribution-list.mock";

export function ContributionList() {
  const data = { contributions: contributionsListMock };
  return (
    <div className="flex w-full flex-col gap-4">
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

import { useIntl } from "src/hooks/useIntl";
import { Contributor } from "src/types";
import OverviewPanel from "./OverviewPanel";
import { useOutletContext } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { ProjectLeadFragment, SponsorFragment, useGetProjectOverviewDetailsQuery } from "src/__generated/graphql";
import { gql } from "@apollo/client";
import QueryWrapper from "src/components/QueryWrapper";
import Card from "src/components/Card";
import GithubRepoDetails from "./GithubRepoDetails";
import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import classNames from "classnames";
import Badge, { BadgeSize } from "src/components/Badge";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import Title from "src/pages/ProjectDetails/Title";
import MarkdownPreview from "src/components/MarkdownPreview";
import { contextWithCacheHeaders } from "src/utils/headers";

type OutletContext = {
  leads?: ProjectLeadFragment[];
  totalSpentAmountInUsd: number;
  totalInitialAmountInUsd: number;
  contributors?: Contributor[];
  projectId: string;
  sponsors: SponsorFragment[];
  telegramLink: string | null;
  children: ReactNode;
};

export default function Overview() {
  const { T } = useIntl();
  const {
    leads,
    totalSpentAmountInUsd,
    totalInitialAmountInUsd,
    contributors,
    sponsors,
    telegramLink,
    children,
    projectId,
  } = useOutletContext<OutletContext>();

  const { data, loading } = useGetProjectOverviewDetailsQuery({
    variables: { projectId },
    ...contextWithCacheHeaders,
  });

  const logoUrl = data?.projectsByPk?.projectDetails?.logoUrl || onlyDustLogo;
  const description = data?.projectsByPk?.projectDetails?.longDescription || LOREM_IPSUM;
  const githubReposCount = data?.projectsByPk?.githubRepos.length || 0;

  const githubRepos = data?.projectsByPk?.githubRepos;

  const [sortedGithubRepos, setSortedGithubRepos] = useState(githubRepos);

  useEffect(() => {
    if (githubRepos) {
      const githubReposCopy = [...githubRepos];
      githubReposCopy.sort(
        (githubRepoA, githubRepoB) =>
          (githubRepoB?.githubRepoDetails?.content?.stars ?? 0) - (githubRepoA?.githubRepoDetails?.content?.stars ?? 0)
      );
      setSortedGithubRepos(githubReposCopy);
    }
  }, [githubRepos]);

  return (
    <>
      <Title>{T("project.details.overview.title")}</Title>
      {children}
      <div className="flex flex-row gap-6">
        <QueryWrapper query={{ data, loading }}>
          <div className="flex flex-col gap-4 w-full">
            <Card className={classNames("px-6 py-4 flex flex-row gap-6")}>
              <img
                alt={data?.projectsByPk?.projectDetails?.name}
                src={logoUrl}
                className="w-32 h-32 flex-shrink-0 rounded-lg bg-spaceBlue-900"
              />
              <div className="self-center">
                <MarkdownPreview>{description}</MarkdownPreview>
              </div>
            </Card>
            <Card className="flex flex-col gap-4">
              <div className="flex flex-row font-walsheim font-medium text-base text-greyscale-50 items-center border-b border-greyscale-50/8 pb-2 justify-between">
                <div className="flex flex-row items-center gap-3">
                  <GitRepositoryLine className="text-white text-2xl" />
                  {T("project.details.overview.repositories.title")}
                </div>
                <Badge value={githubReposCount} size={BadgeSize.Small} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {sortedGithubRepos &&
                  sortedGithubRepos.map(githubRepo => (
                    <GithubRepoDetails key={githubRepo.githubRepoId} githubRepoId={githubRepo.githubRepoId} />
                  ))}
              </div>
            </Card>
          </div>
        </QueryWrapper>
        <OverviewPanel
          {...{
            leads,
            projectId,
            contributors,
            totalSpentAmountInUsd,
            totalInitialAmountInUsd,
            sponsors,
            telegramLink,
          }}
        />
      </div>
    </>
  );
}

gql`
  query GetProjectOverviewDetails($projectId: uuid!) {
    projectsByPk(id: $projectId) {
      id
      projectDetails {
        projectId
        name
        longDescription
        logoUrl
      }
      githubRepos {
        projectId
        githubRepoId
        repo {
          ...GithubRepoId
          stars
        }
      }
    }
  }
`;

const LOREM_IPSUM = `
Lorem ipsum dolor sit amet, consectetur *adipiscing elit*. Sed non risus. **Suspendisse lectus** tortor, dignissim sit amet:
- adipiscing nec
- ultricies sed
- dolor.

Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue.
`;

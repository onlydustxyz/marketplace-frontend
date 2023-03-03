import { useIntl } from "src/hooks/useIntl";
import { Contributor, HasuraUserRole } from "src/types";
import OverviewPanel from "./OverviewPanel";
import { useOutletContext } from "react-router-dom";
import { ReactNode, useEffect, useRef, useState } from "react";
import { GetProjectOverviewDetailsQuery, ProjectLeadFragment, SponsorFragment } from "src/__generated/graphql";
import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import QueryWrapper from "src/components/QueryWrapper";
import Card from "src/components/Card";
import GithubRepoDetails from "./GithubRepoDetails";
import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import classNames from "classnames";
import Badge, { BadgeSize } from "src/components/Badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import { useContainerDimensions } from "./useContainerDimensions";

type OutletContext = {
  leads?: ProjectLeadFragment[];
  totalSpentAmountInUsd: number;
  contributors?: Contributor[];
  projectId: string;
  sponsors: SponsorFragment[];
  telegramLink: string | null;
  children: ReactNode;
};

export default function Overview() {
  const { T } = useIntl();
  const { leads, totalSpentAmountInUsd, contributors, sponsors, telegramLink, children, projectId } =
    useOutletContext<OutletContext>();

  const { data, loading } = useHasuraQuery<GetProjectOverviewDetailsQuery>(
    GET_PROJECT_OVERVIEW_DETAILS,
    HasuraUserRole.Public,
    {
      variables: { projectId },
    }
  );

  const logoUrl = data?.projectsByPk?.projectDetails?.logoUrl || onlyDustLogo;
  const description = data?.projectsByPk?.projectDetails?.longDescription || LOREM_IPSUM;
  const githubReposCount = data?.projectsByPk?.githubRepos.length || 0;

  const githubRepos = data?.projectsByPk?.githubRepos;

  const [sortedGithubRepos, setSortedGithubRepos] = useState(githubRepos);

  const descriptionRef = useRef(null);
  const { height: descriptionHeight } = useContainerDimensions(descriptionRef);
  console.log(descriptionHeight);

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
    <div className="flex flex-col gap-8 mt-3">
      <div className="text-3xl font-belwe">{T("project.details.overview.title")}</div>
      {children}
      <div className="flex flex-row gap-6">
        <QueryWrapper query={{ data, loading }}>
          <div className="flex flex-col gap-4 w-full">
            <Card
              className={classNames("px-6 py-4 flex flex-row gap-6", {
                "items-start": descriptionHeight > 128,
                "items-center": descriptionHeight <= 128,
              })}
            >
              <img
                alt={data?.projectsByPk?.projectDetails?.name}
                src={logoUrl}
                className="w-32 h-32 flex-shrink-0 rounded-lg bg-spaceBlue-900"
              />
              <div ref={descriptionRef}>
                <ReactMarkdown
                  skipHtml={true}
                  remarkPlugins={[[remarkGfm]]}
                  className="text-greyscale-50 font-walsheim font-normal text-sm text-justify max-w-full prose prose-invert"
                >
                  {description}
                </ReactMarkdown>
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
        <OverviewPanel {...{ leads, projectId, contributors, totalSpentAmountInUsd, sponsors, telegramLink }} />
      </div>
    </div>
  );
}

export const GET_PROJECT_OVERVIEW_DETAILS = gql`
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
        githubRepoId
        githubRepoDetails {
          content {
            stars
          }
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

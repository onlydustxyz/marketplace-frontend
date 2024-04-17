import { useParams } from "next/navigation";

import ProjectApi from "src/api/Project";
import Flex from "src/components/Utils/Flex";
import { useIntl } from "src/hooks/useIntl";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";

import Title from "../Title";
import { EditProjectButton } from "../components/EditProjectButton";
import { RewardProjectButton } from "../components/RewardProjectButton";
import ChurnedContributors from "./ChurnedContributors";
import MostActiveContributors from "./MostActiveContributors";
import NewcomersContributors from "./NewcomersContributors";
import StrugglingContributors from "./StrugglingContributors";

export default function Insights() {
  const { T } = useIntl();
  const { slug = "" } = useParams<{ slug?: string }>();

  const { data: project } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug },
  });

  const orgsWithUnauthorizedRepos = project ? getOrgsWithUnauthorizedRepos(project) : [];
  const hasOrgsWithUnauthorizedRepos = orgsWithUnauthorizedRepos.length > 0;

  return (
    <>
      <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-2">
        <Title>{T("project.details.insights.title")}</Title>
        {!hasOrgsWithUnauthorizedRepos ? (
          <Flex className="w-full justify-start gap-2 md:w-auto md:justify-end">
            <EditProjectButton projectKey={slug} />
            {project && <RewardProjectButton project={project} />}
          </Flex>
        ) : null}
      </div>

      <div className="h-full overflow-y-auto">
        <div className="scrollbar-sm h-full w-full overflow-y-auto pr-1.5">
          <div className="relative flex min-h-full flex-col gap-6">
            <NewcomersContributors projectId={project?.id} />
            <MostActiveContributors projectId={project?.id} />
            <StrugglingContributors projectId={project?.id} />
            <ChurnedContributors projectId={project?.id} />
          </div>
        </div>
      </div>
    </>
  );
}

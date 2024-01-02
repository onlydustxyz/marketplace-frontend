import { useParams } from "react-router-dom";
import ProjectApi from "src/api/Project";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";
import Title from "../Title";
import Flex from "src/components/Utils/Flex";
import { EditProjectButton } from "../components/EditProjectButton";
import { useIntl } from "src/hooks/useIntl";
import NewcomersContributors from "./NewcomersContributors";
import MostActiveContributors from "./MostActiveContributors";
import StrugglingContributors from "./StrugglingContributors";
import ChurnedContributors from "./ChurnedContributors";
import { RewardProjectButton } from "../components/RewardProjectButton";

export default function Insights() {
  const { T } = useIntl();
  const { projectKey = "" } = useParams<{ projectKey?: string }>();

  const { data: project } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug: projectKey },
  });

  const orgsWithUnauthorizedRepos = project ? getOrgsWithUnauthorizedRepos(project) : [];
  const hasOrgsWithUnauthorizedRepos = orgsWithUnauthorizedRepos.length > 0;

  return (
    <>
      <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-2">
        <Title>{T("project.details.insights.title")}</Title>
        {!hasOrgsWithUnauthorizedRepos ? (
          <Flex className="w-full justify-start gap-2 md:w-auto md:justify-end">
            <EditProjectButton projectKey={projectKey} />
            {project && <RewardProjectButton project={project} />}
          </Flex>
        ) : null}
      </div>

      <div className="h-full overflow-y-auto">
        <div className="h-full w-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
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

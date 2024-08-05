import { meApiClient } from "api-client/resources/me";
import { useParams } from "next/navigation";

import { ProjectSummary } from "app/(v1)/c/[committeeId]/components/project-summary/project-summary";
import { ReadOnlyQuestions } from "app/(v1)/c/[committeeId]/components/read-only-questions/read-only-questions";
import { ProjectError } from "app/(v1)/c/[committeeId]/jury/features/project-error/project-error";
import { ProjectVote } from "app/(v1)/c/[committeeId]/jury/features/project-vote/project-vote";
import { TProject } from "app/(v1)/c/[committeeId]/jury/features/project/project.types";

import { Spinner } from "src/components/Spinner/Spinner";

import { Card } from "components/ds/card/card";

export function Project({ projectId, enabled }: TProject.Props) {
  const { committeeId } = useParams();

  const { data, isLoading, isError } = meApiClient.queries.useGetMyCommitteeAssignmentProject(
    {
      committeeId: typeof committeeId === "string" ? committeeId : "",
      projectId,
    },
    { enabled }
  );

  if (isError) {
    return <ProjectError />;
  }

  if (isLoading) {
    return (
      <div className={"flex h-24 items-center justify-center"}>
        <Spinner className={"h-8 w-8"} />
      </div>
    );
  }

  if (!data) {
    return <ProjectError />;
  }

  const { project, answers, votes } = data;

  return (
    <div className={"grid gap-4"}>
      <ProjectSummary project={project} />

      {answers.length ? (
        <Card className="rounded-none border-l-0 border-r-0 border-card-border-light bg-transparent p-2 py-4 sm:rounded-2xl sm:border-card-border-light sm:bg-card-background-light sm:p-4 sm:shadow-light lg:p-6">
          <ReadOnlyQuestions questions={answers} />
        </Card>
      ) : null}

      {votes ? <ProjectVote projectId={project.id} votes={votes} /> : null}
    </div>
  );
}

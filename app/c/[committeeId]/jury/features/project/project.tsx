import { meApiClient } from "api-client/resources/me";
import { useParams } from "next/navigation";

import { ProjectSummary } from "app/c/[committeeId]/components/project-summary/project-summary";
import { ReadOnlyQuestions } from "app/c/[committeeId]/components/read-only-questions/read-only-questions";
import { ProjectVote } from "app/c/[committeeId]/jury/features/project-vote/project-vote";
import { TProject } from "app/c/[committeeId]/jury/features/project/project.types";

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

  if (isError || !data) {
    // TODO
    return "Failed";
  }

  if (isLoading) {
    // TODO
    return "Loading";
  }

  const { project, answers } = data;

  return (
    <div className={"grid gap-4"}>
      <ProjectSummary project={project} />

      {answers.length ? (
        <Card>
          <ReadOnlyQuestions questions={answers} />
        </Card>
      ) : null}

      <ProjectVote
        projectId={project.id}
        criteria={[
          {
            message: "Criteria 1",
            score: 0,
          },
          {
            message:
              "Criteria 2 hqsdfh qsdklfhqs klfqshfkl qshfkqs fqsklhf klsdhf qsklfhql kjhqsdfkqhsfklqs fklqs kflqsh fkjlqsdhfkqshfkqsjh fkqsh fqsfklqsh fkjlqsh dhkqsdh fkjqsdhfk qsd",
            score: 3,
          },
        ]}
      />
    </div>
  );
}

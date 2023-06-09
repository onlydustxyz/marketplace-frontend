import { useSuspenseQuery_experimental as useSuspenseQuery } from "@apollo/client";
import { GetProjectContributorsDocument, GetProjectContributorsQuery } from "src/__generated/graphql";
import { useOnProjectChange } from "src/providers/Commands";
import { contextWithCacheHeaders } from "src/utils/headers";
import isDefined from "src/utils/isDefined";

export default function useProjectContributors(projectId: string) {
  const { data, refetch } = useSuspenseQuery<GetProjectContributorsQuery>(GetProjectContributorsDocument, {
    variables: { projectId },
    suspensePolicy: "initial",
    ...contextWithCacheHeaders,
  });

  useOnProjectChange(projectId, refetch);

  return {
    contributors: data.projectsContributorsView.map(u => u.user).filter(isDefined),
  };
}

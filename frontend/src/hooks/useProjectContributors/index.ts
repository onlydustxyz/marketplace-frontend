import { useSuspenseQuery_experimental as useSuspenseQuery } from "@apollo/client";
import { GetProjectContributorsDocument, GetProjectContributorsQuery } from "src/__generated/graphql";
import { contextWithCacheHeaders } from "src/utils/headers";
import isDefined from "src/utils/isDefined";

export default function useProjectContributors(projectId: string) {
  const query = useSuspenseQuery<GetProjectContributorsQuery>(GetProjectContributorsDocument, {
    variables: { projectId },
    ...contextWithCacheHeaders,
  });

  return {
    contributors: query.data.projectsContributorsView.map(u => u.user).filter(isDefined),
  };
}

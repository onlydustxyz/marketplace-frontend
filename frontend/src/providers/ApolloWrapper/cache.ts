import { InMemoryCache } from "@apollo/client";
import { uniqBy } from "lodash";

export default function useApolloCache() {
  return new InMemoryCache({
    typePolicies: {
      ProjectDetails: {
        keyFields: ["projectId"],
      },
      UserInfo: {
        keyFields: ["userId"],
      },
      WorkItems: {
        keyFields: ["paymentId", "repoId", "issueNumber"],
      },
      IgnoredGithubIssues: {
        keyFields: ["projectId", "repoId", "issueNumber"],
      },
      GithubUsers: {
        fields: {
          paymentRequests: {
            merge: (existing = [], incoming) => uniqBy([...existing, ...incoming], "__ref"),
          },
        },
      },
      Projects: {
        fields: {
          applications: {
            merge: (existing = [], incoming) => uniqBy([...existing, ...incoming], "__ref"),
          },
        },
      },
    },
  });
}

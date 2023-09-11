import { InMemoryCache } from "@apollo/client";
import { uniqBy } from "lodash";
import { ContactInformations, Contacts } from "src/__generated/graphql";

export default function useApolloCache() {
  return new InMemoryCache({
    typePolicies: {
      ProjectDetails: {
        keyFields: ["projectId"],
      },
      UserInfo: {
        keyFields: ["userId"],
      },
      UserProfiles: {
        keyFields: ["githubUserId"],
        fields: {
          contacts(_, { readField }) {
            const NO_CONTACT: Contacts = {
              email: null,
              telegram: null,
              twitter: null,
              discord: null,
              linkedin: null,
              whatsapp: null,
            };

            const contacts = readField<ContactInformations[]>({ fieldName: "contactInformations" })?.map(
              ({ channel, ...contact }) => [channel, contact]
            );

            return { ...NO_CONTACT, ...Object.fromEntries(contacts || []) };
          },

          completionScore(_, { readField }) {
            const scoreByExistence = (fieldName: string, score: number) => (readField({ fieldName }) ? score : 0);

            const scoreContact = (
              channel: "email" | "telegram" | "whatsapp" | "twitter" | "discord" | "linkedin",
              score: number
            ) => (readField<Contacts>({ fieldName: "contacts" })?.[channel]?.contact ? score : 0);

            const scoreLanguages = (score: number) =>
              Object.keys(readField<Record<string, number>>({ fieldName: "languages" }) || {}).length > 0 ? score : 0;

            return (
              scoreByExistence("avatarUrl", 5) +
              scoreByExistence("login", 10) +
              scoreByExistence("location", 10) +
              scoreByExistence("bio", 20) +
              scoreByExistence("website", 10) +
              scoreByExistence("login", 5) +
              scoreContact("email", 5) +
              scoreContact("telegram", 5) +
              scoreContact("whatsapp", 5) +
              scoreContact("twitter", 5) +
              scoreContact("discord", 5) +
              scoreContact("linkedin", 5) +
              scoreLanguages(10)
            );
          },
        },
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
      Onboardings: {
        keyFields: ["userId"],
      },
    },
  });
}

import { gql } from "@apollo/client";

export const GITHUB_REPO_FIELDS_FOR_PROJECT_CARD_FRAGMENT = gql`
  fragment GithubRepoFieldsForProjectCard on GithubRepoDetails {
    name
    owner
    content {
      contributors {
        login
        avatarUrl
      }
      logoUrl
    }
    languages
  }
`;

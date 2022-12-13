import { gql } from "@apollo/client";

export const GITHUB_REPO_FIELDS_FOR_PROJECT_CARD_FRAGMENT = gql`
  fragment GithubRepoFieldsForProjectCard on Repository {
    name
    owner
    contributors {
      login
    }
  }
`;

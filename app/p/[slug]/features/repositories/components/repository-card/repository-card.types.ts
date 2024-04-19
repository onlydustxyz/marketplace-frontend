import { components } from "src/__generated/api";

export namespace TRepositoryCard {
  export interface Props {
    repository: components["schemas"]["GithubRepoResponse"];
  }
}

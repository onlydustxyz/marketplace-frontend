import View from "./View";
import { components } from "src/__generated/api";

type Props = {
  githubRepo?: components["schemas"]["GithubRepoResponse"];
};

export default function GithubRepoDetails({ githubRepo }: Props) {
  return <View githubRepo={githubRepo} />;
}

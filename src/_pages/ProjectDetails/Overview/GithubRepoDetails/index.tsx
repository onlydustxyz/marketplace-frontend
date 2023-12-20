import { ComponentProps } from "react";
import View from "./View";

export default function GithubRepoDetails({ githubRepo }: Partial<ComponentProps<typeof View>>) {
  return githubRepo ? <View githubRepo={githubRepo} /> : null;
}

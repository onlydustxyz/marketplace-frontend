import { ComponentProps } from "react";

import View from "./View";

export default function GithubRepoDetails({
  githubRepo,
  withBg = true,
}: Partial<ComponentProps<typeof View>> & { withBg?: boolean }) {
  return githubRepo ? <View githubRepo={githubRepo} withBg={withBg} /> : null;
}

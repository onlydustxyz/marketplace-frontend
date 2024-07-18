import { Paper } from "components/atoms/paper";

import { Header } from "./components/header/header";
import { RecommendedFilters } from "./components/recommended-filters/recommended-filters";
import { THackathonIssues } from "./hackathon-issues.types";

export function HackathonIssues(_: THackathonIssues.Props) {
  return (
    <Paper size="m" container="2" classNames={{ base: "flex flex-col gap-3" }}>
      <Header />
      <RecommendedFilters />

      <p>Content</p>
    </Paper>
  );
}

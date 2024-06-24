import { lazy } from "react";

import { ApplyIssueCard } from "app/p/[slug]/components/apply-issue-card/apply-issue-card";

const MarkdownPreview = lazy(() => import("src/components/MarkdownPreview"));

export function ApplyIssueMarkdown({ children }: { children?: string }) {
  if (!children) return null;

  return (
    <ApplyIssueCard
      iconProps={{ remixName: "ri-bill-line" }}
      titleProps={{
        translate: {
          token: "v2.features.projects.applyIssueDrawer.sections.description",
        },
      }}
    >
      <MarkdownPreview className={"pt-3 text-sm"}>{children}</MarkdownPreview>
    </ApplyIssueCard>
  );
}

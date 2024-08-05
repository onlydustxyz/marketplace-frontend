import { lazy } from "react";

const MarkdownPreview = lazy(() => import("src/components/MarkdownPreview"));

export function OverviewMarkdown({ children }: { children: string }) {
  return <MarkdownPreview>{children}</MarkdownPreview>;
}

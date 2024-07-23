"use client";

import { useContext, useMemo } from "react";

import { Avatar } from "components/atoms/avatar";
import { Typo } from "components/atoms/typo";
import { AccordionItemWithBadgeProps } from "components/molecules/accordion";
import { AccordionWithBadge } from "components/molecules/accordion/variants/accordion-with-badge";

import { Header } from "./components/header/header";
import { IssuesWrapper } from "./components/issues-wrapper/issues-wrapper";
import { RecommendedFilters } from "./components/recommended-filters/recommended-filters";
import { HackathonIssuesContext } from "./context/hackathon-issues.context";

export function HackathonIssues() {
  const { projectIssues } = useContext(HackathonIssuesContext);

  const items: AccordionItemWithBadgeProps[] = useMemo(() => {
    return (
      projectIssues?.map(projectIssue => {
        return {
          id: projectIssue.project.id,
          titleProps: {
            children: projectIssue.project.name,
          },
          badgeProps: {
            children: projectIssue.issueCount,
          },
          startContent: <Avatar size="xs" shape="square" src={projectIssue.project.logoUrl} />,
          content: <IssuesWrapper projectId={projectIssue.project.id} />,
        };
      }) || []
    );
  }, [projectIssues]);

  return (
    <>
      <Header />
      <RecommendedFilters />

      {!items.length ? (
        <div className="flex flex-col items-center gap-1 py-4">
          <Typo variant="brand" translate={{ token: "v2.pages.hackathons.details.issues.filters.empty.title" }} />
          <Typo size="s" translate={{ token: "v2.pages.hackathons.details.issues.filters.empty.description" }} />
        </div>
      ) : (
        <AccordionWithBadge classNames={{ base: "gap-3" }} items={items} />
      )}
    </>
  );
}

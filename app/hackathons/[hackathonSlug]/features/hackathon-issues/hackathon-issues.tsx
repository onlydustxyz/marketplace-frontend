"use client";

import { useContext } from "react";

import { Paper } from "components/atoms/paper";
import { Accordion, AccordionItemProps } from "components/molecules/accordion";

import { HackathonIssuesContext } from "../../context/hackathon-issues.context";
import { Header } from "./components/header/header";
import { RecommendedFilters } from "./components/recommended-filters/recommended-filters";

export function HackathonIssues() {
  const { projectIssues } = useContext(HackathonIssuesContext);

  const items: AccordionItemProps[] = projectIssues.map(projectIssue => {
    return {
      id: projectIssue.project.id,
      titleProps: {
        children: projectIssue.project.name,
      },
      content: <p>TODO</p>,
    };
  });

  // const projectStorage = bootstrap.getProjectStoragePortForServer();
  // const issues = await projectStorage.getProjectPublicIssues({ pathParams: { projectId } }).request();

  return (
    <Paper size="m" container="2" classNames={{ base: "flex flex-col gap-3" }}>
      <Header />
      <RecommendedFilters />

      <div>
        <Accordion items={items} multiple />
      </div>
    </Paper>
  );
}

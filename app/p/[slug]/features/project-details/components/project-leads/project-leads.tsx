import { useMemo } from "react";

import { Contributor } from "components/features/contributor/contributor";
import { Flex } from "components/layout/flex/flex";

import { Section } from "../section/section";
import { TProjectLeads } from "./project-leads.types";

export function ProjectLeads({ projectLeads }: TProjectLeads.Props) {
  const sortedByLogin = useMemo(() => {
    return [...projectLeads].sort((a, b) => a.login.localeCompare(b.login));
  }, [projectLeads]);

  if (sortedByLogin.length === 0) {
    return null;
  }

  return (
    <Section
      title={{
        token: "v2.pages.project.overview.projectDetails.projectLeads",
        params: {
          count: sortedByLogin.length,
        },
      }}
      remixIconName="ri-star-line"
    >
      <Flex wrap="wrap" className="gap-3">
        {sortedByLogin?.map(lead => (
          <Contributor
            key={lead.id}
            login={lead.login}
            avatarUrl={lead.avatarUrl}
            githubUserId={lead.githubUserId}
            isRegistered={false}
            clickable={true}
          />
        ))}
      </Flex>
    </Section>
  );
}

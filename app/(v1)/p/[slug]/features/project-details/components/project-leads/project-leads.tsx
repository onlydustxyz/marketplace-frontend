import { useMemo } from "react";

import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";

import { Contributor } from "components/features/contributor/contributor";
import { Flex } from "components/layout/flex/flex";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { Section } from "../section/section";
import { TProjectLeads } from "./project-leads.types";

export function ProjectLeads({ projectId, projectInvited, projectLeads }: TProjectLeads.Props) {
  const isProjectLeader = useProjectLeader({ id: projectId });

  const showInvited = isProjectLeader;

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

        {showInvited &&
          projectInvited?.map(lead => (
            <Flex key={lead.login} alignItems="center" className="gap-1">
              <Contributor
                login={lead.login}
                avatarUrl={lead.avatarUrl}
                githubUserId={lead.githubUserId}
                isRegistered={false}
                clickable={true}
              />

              <Typography variant="body-s" className="text-spaceBlue-200">
                (<Translate token="v2.commons.pendingInvite" />)
              </Typography>
            </Flex>
          ))}
      </Flex>
    </Section>
  );
}

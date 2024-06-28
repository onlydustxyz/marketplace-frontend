"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import { withLeadRequired } from "components/features/auth0/guards/lead-guard";
import { Flex } from "components/layout/flex/flex";

import { ContributionHeader } from "./features/contribution-header/contribution-header";
import { ContributorDetails } from "./features/contributor-details/contributor-details";
import { ContributorSelect } from "./features/contributor-select/contributor-select";
import { UseApplications } from "./hooks/use-applications/use-applications";

function ContributionPage() {
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

  const { newComers, projectMembers, title } = UseApplications({ search });

  const handleSelectUser = (githubId: number, applicationId: string) => {
    setSelectedUser(githubId);
    setSelectedApplication(applicationId);
  };

  useEffect(() => {
    const applications = [...(newComers.applications || []), ...(projectMembers.applications || [])];

    if (applications.length && !selectedUser && !selectedApplication) {
      setSelectedUser(applications[0].applicant.githubUserId);
      setSelectedApplication(applications[0].id);
    }
  }, [newComers.applications, projectMembers.applications]);

  return (
    <Flex direction="col" className="gap-6">
      <ContributionHeader title={title} />

      <Flex className="flex-col gap-6 lg:flex-row">
        <ContributorSelect
          search={search}
          setSearch={setSearch}
          selectedUser={selectedUser}
          handleSelectUser={handleSelectUser}
          newComers={newComers}
          projectMembers={projectMembers}
        />

        {selectedUser && selectedApplication ? (
          <ContributorDetails githubId={selectedUser} applicationId={selectedApplication} />
        ) : null}
      </Flex>
    </Flex>
  );
}

export default withAuthenticationRequired(withLeadRequired(ContributionPage));

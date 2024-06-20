"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useParams } from "next/navigation";

import { withLeadRequired } from "components/features/auth0/guards/lead-guard";
import { Flex } from "components/layout/flex/flex";

import { ContributionHeader } from "./features/contribution-header/contribution-header";
import { ContributorDetails } from "./features/contributor-details/contributor-details";
import { ContributorSelect } from "./features/contributor-select/contributor-select";

function ContributionPage() {
  const { slug = "", contributionId = "" } = useParams<{ slug?: string; contributionId?: string }>();

  return (
    <Flex direction="col" className="gap-6">
      <ContributionHeader title={`Title to change : ${slug} ${contributionId}`} />

      <Flex className="gap-6">
        <ContributorSelect />
        <ContributorDetails />
      </Flex>
    </Flex>
  );
}

export default withAuthenticationRequired(withLeadRequired(ContributionPage));

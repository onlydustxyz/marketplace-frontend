import { Sponsor } from "../../types";
import { chain, zip } from "lodash";
import { mutateAsAdmin } from "../common";
import { projects } from "../../fixtures/projects";
import {
  CreateSponsorMutation,
  CreateSponsorMutationVariables,
  CreateSponsorDocument,
} from "../../__generated/graphql";

export const populateSponsors = async (): Promise<Record<string, Sponsor>> => {
  const sponsor_names = chain(Object.values(projects))
    .flatMap("sponsors")
    .uniq()
    .filter(s => !!s)
    .value();

  const sponsors = await Promise.all(
    sponsor_names.map(name =>
      mutateAsAdmin<CreateSponsorMutation, CreateSponsorMutationVariables>({
        mutation: CreateSponsorDocument,
        variables: { name, logoUrl: "https://starkware.co/wp-content/uploads/2021/07/Group-177.svg", url: null },
      })
    )
  );

  const sponsor_ids = sponsors.map(sponsor => sponsor.data?.createSponsor);
  return Object.fromEntries(zip(sponsor_ids, sponsor_names).map(([id, name]) => [name, { id, name }]));
};

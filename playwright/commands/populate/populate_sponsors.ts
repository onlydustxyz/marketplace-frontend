import { Project, Sponsor } from "../../types";
import { chain, zip } from "lodash";
import { mutateAsAdmin } from "../common";
import {
  CreateSponsorMutation,
  CreateSponsorMutationVariables,
  CreateSponsorDocument,
} from "../../__generated/graphql";

export const populateSponsors = async (projects: Record<string, Project>): Promise<Record<string, Sponsor>> => {
  const sponsor_names = chain(Object.values(projects))
    .flatMap("sponsors")
    .uniq()
    .filter(s => !!s)
    .value();

  const sponsor_ids = await Promise.all(
    sponsor_names.map(name =>
      mutateAsAdmin<CreateSponsorMutation, CreateSponsorMutationVariables>({
        mutation: CreateSponsorDocument,
        variables: { name, logoUrl: "https://starkware.co/wp-content/uploads/2021/07/Group-177.svg", url: null },
      })
    )
  );

  return Object.fromEntries(zip(sponsor_ids, sponsor_names).map(([id, name]) => [name, { id, name }]));
};

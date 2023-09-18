import { Sponsor } from "../../types";
import { chain, zip } from "lodash";
import { projects } from "../../fixtures/data/projects";
import { create as createSponsor } from "../sponsor";

export const populateSponsors = async (): Promise<Record<string, Sponsor>> => {
  const sponsor_names = chain(Object.values(projects))
    .flatMap("sponsors")
    .uniq()
    .filter(s => !!s)
    .value();

  const sponsors = await Promise.all(
    sponsor_names.map(name =>
      createSponsor({ name, logoUrl: "https://starkware.co/wp-content/uploads/2021/07/Group-177.svg" })
    )
  );

  const sponsor_ids = sponsors.map(sponsor => sponsor.sponsorId);
  return Object.fromEntries(zip(sponsor_ids, sponsor_names).map(([id, name]) => [name, { id, name }]));
};

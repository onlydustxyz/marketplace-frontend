import { Uuid } from "../common";
import { chain } from "lodash";
import { Project } from "./projects";

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      populateSponsors(): Chainable<Map<string, Sponsor>>;
    }
  }
}

export type Sponsor = {
  id: Uuid;
  name: string;
};

Cypress.Commands.add("populateSponsors", function () {
  cy.fixture("projects.json").then((projects: any) => {
    const augmented_sponsors = new Map<string, Sponsor>();
    chain(Object.values(projects))
      .flatMap("sponsors")
      .uniq()
      .filter(s => !!s)
      .forEach(sponsor =>
        cy
          .createSponsor(sponsor, "https://starkware.co/wp-content/uploads/2021/07/Group-177.svg")
          .then(id => augmented_sponsors.set(sponsor, { id, name: sponsor }))
      )
      .value();

    cy.then(() => {
      cy.writeFile("cypress/fixtures/__generated/sponsors.json", Object.fromEntries(augmented_sponsors));
      cy.wrap(Object.fromEntries(augmented_sponsors)).as("sponsors");
    });
  });
});

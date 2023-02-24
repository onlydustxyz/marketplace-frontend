import { WAIT_SHORT } from "./common";

Cypress.Commands.add("createSponsor", (name, logoUrl, url) => {
  return cy
    .graphql({
      query: `mutation createSponsor($name: String!, $logoUrl: String!, $url: String) {
                insertSponsorsOne(object: {name: $name, logoUrl: $logoUrl, url: $url}, onConflict: {constraint: sponsors_name_key, update_columns: [name, logoUrl, url]}) {
                  id
                }
              }
              `,
      variables: { name, logoUrl, url },
      wait: WAIT_SHORT,
    })
    .asAdmin()
    .data("insertSponsorsOne.id");
});

Cypress.Commands.add("addSponsorToProject", (projectId, sponsorId) => {
  return cy
    .graphql({
      query: `mutation($projectId: Uuid!, $sponsorId: Uuid!) {
                addSponsorToProject(projectId: $projectId, sponsorId: $sponsorId) {
                    projectId
                }
            }`,
      variables: { projectId, sponsorId },
      wait: WAIT_SHORT,
    })
    .asAdmin()
    .data("addSponsorToProject.projectId");
});

Cypress.Commands.add("removeSponsorFromProject", (projectId, sponsorId) => {
  return cy
    .graphql({
      query: `mutation($projectId: Uuid!, $sponsorId: Uuid!) {
                removeSponsorFromProject(projectId: $projectId, sponsorId: $sponsorId) {
                    projectId
                }
            }`,
      variables: { projectId, sponsorId },
      wait: WAIT_SHORT,
    })
    .asAdmin()
    .data("removeSponsorFromProject.projectId");
});

import { WAIT_SHORT } from "./common";

Cypress.Commands.add("createSponsor", (name, logoUrl, url) => {
  return cy
    .graphql({
      query: `mutation($name: String!, $logoUrl: Url!, $url: Url) {
                createSponsor(name: $name, logoUrl: $logoUrl, url: $url)
              }
              `,
      variables: { name, logoUrl, url },
      wait: WAIT_SHORT,
    })
    .asAdmin()
    .data("createSponsor");
});

Cypress.Commands.add("updateSponsor", (sponsorId, name = undefined, logoUrl = undefined, url = undefined) => {
  return cy
    .graphql({
      query: `mutation($sponsorId: Uuid!, $name: String, $logoUrl: Url, $url: Url) {
                  updateSponsor(sponsorId: $sponsorId, name: $name, logoUrl: $logoUrl, url: $url)
                }
                `,
      variables: { sponsorId, name, logoUrl, url },
      wait: WAIT_SHORT,
    })
    .asAdmin()
    .data("updateSponsor");
});

Cypress.Commands.add("addSponsorToProject", (projectId, sponsorId) => {
  return cy
    .graphql({
      query: `mutation($projectId: Uuid!, $sponsorId: Uuid!) {
                addSponsorToProject(projectId: $projectId, sponsorId: $sponsorId)
            }`,
      variables: { projectId, sponsorId },
      wait: WAIT_SHORT,
    })
    .asAdmin()
    .data("addSponsorToProject");
});

Cypress.Commands.add("removeSponsorFromProject", (projectId, sponsorId) => {
  return cy
    .graphql({
      query: `mutation($projectId: Uuid!, $sponsorId: Uuid!) {
                removeSponsorFromProject(projectId: $projectId, sponsorId: $sponsorId)
            }`,
      variables: { projectId, sponsorId },
      wait: WAIT_SHORT,
    })
    .asAdmin()
    .data("removeSponsorFromProject");
});

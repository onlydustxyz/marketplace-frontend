import { gql } from "@apollo/client/core";

export const CREATE_SPONSOR = gql(`
mutation createSponsor($name: String!, $logoUrl: Url!, $url: Url) {
    createSponsor(name: $name, logoUrl: $logoUrl, url: $url)
}
`);

export const UPDATE_SPONSOR = gql(`
mutation updateSponsor($sponsorId: Uuid!, $name: String, $logoUrl: Url, $url: Url) {
    updateSponsor(sponsorId: $sponsorId, name: $name, logoUrl: $logoUrl, url: $url)
}
`);

export const ADD_SPONSOR_TO_PROJECT = gql(`
mutation addSponsorToProject($projectId: Uuid!, $sponsorId: Uuid!) {
    addSponsorToProject(projectId: $projectId, sponsorId: $sponsorId)
}
`);

export const REMOVE_SPONSOR_FROM_PROJECT = gql(`
mutation removeSponsorFromProject($projectId: Uuid!, $sponsorId: Uuid!) {
    removeSponsorFromProject(projectId: $projectId, sponsorId: $sponsorId)
}
`);

import { ecosystemsApiClient } from "api-client/resources/ecosystems";
import { GetEcosystemProjectPageResponse } from "api-client/resources/ecosystems/types";

import { Container } from "components/layout/container/container";

import mock from "../../mock/get-all-ecosystem.json";

export async function AllEcosystems() {
  const _ecosystems = await ecosystemsApiClient.fetch.getAllEcosystems({ featured: false }).request();
  const ecosystems = mock as unknown as GetEcosystemProjectPageResponse;
  console.log("all ecosystems", ecosystems);

  return <Container>all ecosystems</Container>;
}

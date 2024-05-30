import { ecosystemsApiClient } from "api-client/resources/ecosystems";

import { Container } from "components/layout/container/container";

export async function FeaturedEcosystems() {
  const ecosystems = await ecosystemsApiClient.fetch.getAllEcosystems({ featured: true }).request();

  console.log("featured ecosystems", ecosystems);

  return <Container>featured ecosystems</Container>;
}

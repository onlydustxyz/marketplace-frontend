import { ecosystemsApiClient } from "api-client/resources/ecosystems";
import { GetEcosystemPageResponse } from "api-client/resources/ecosystems/types";

import mock from "../../mock/get-all-ecosystem.json";

export async function AllEcosystems() {
  await ecosystemsApiClient.fetch.getAllEcosystems({ featured: false }).request();
  const ecosystems = mock as GetEcosystemPageResponse;
  console.log("all ecosystems", ecosystems);

  return <div>All ecosystems</div>;
}

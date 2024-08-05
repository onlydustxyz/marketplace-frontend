import { EcosystemProject } from "api-client/resources/ecosystems/types";

export namespace TContributors {
  export interface Props {
    topContributors?: EcosystemProject["topContributors"];
    contributorsCount?: EcosystemProject["contributorsCount"];
  }
}

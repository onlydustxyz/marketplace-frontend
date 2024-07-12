import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";

import { components } from "src/__generated/api";

type HackathonsDetailsResponse = components["schemas"]["HackathonsDetailsResponse"];

interface HackathonInterface extends HackathonsDetailsResponse {}

export class Hackathon extends mapApiToClass<HackathonsDetailsResponse>() implements HackathonInterface {
  constructor(readonly props: HackathonsDetailsResponse) {
    super(props);
  }
}

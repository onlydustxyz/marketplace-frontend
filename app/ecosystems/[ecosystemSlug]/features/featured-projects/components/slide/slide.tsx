import { EcosystemProject } from "api-client/resources/ecosystems/types";

import { Card } from "components/ds/card/card";

export function Slide({ project }: { project: EcosystemProject }) {
  return (
    <Card>
      <h2>{project.name}</h2>
    </Card>
  );
}

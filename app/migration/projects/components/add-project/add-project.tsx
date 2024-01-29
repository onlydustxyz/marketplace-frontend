import { Card } from "components/ds/card/card";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { AddProjectModal } from "./add-project-modal";

export function AddProject() {
  return (
    <Card background="base" border="medium" className="mb-4 flex items-center gap-4">
      <Typography variant="body-s">
        <Translate token="project.details.create.description" />
      </Typography>

      <AddProjectModal />
    </Card>
  );
}

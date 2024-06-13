import { Card } from "components/ds/card/card";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { AddProjectButton } from "../add-project-button/add-project-button";

export function AddProject() {
  return (
    <Card background="base" border="light" className="flex items-center gap-4">
      <Typography variant="body-s" className="flex-1" translate={{ token: "v2.pages.projects.addProject.label" }} />

      <AddProjectButton
        buttonProps={{
          size: "s",
          children: (
            <>
              <Icon remixName="ri-magic-line" />
              <Translate token="v2.pages.projects.addProject.btn" />
            </>
          ),
        }}
      />
    </Card>
  );
}

import Card from "@/components/ds/card/card";
import Translate from "@/components/layout/translate/translate";
import { Typography } from "@/components/layout/typography/typography";
import { FC } from "react";
import { AddProjectModal } from "./add-project-modal";

export const AddProject: FC = () => {
  return (
    <Card className="mb-4 flex items-center gap-4">
      <Typography variant="body-s">
        <Translate token="project.details.create.description" />
      </Typography>

      <AddProjectModal />
    </Card>
  );
};

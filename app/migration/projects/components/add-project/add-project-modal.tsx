"use client";

import { Button } from "@/components/ds/button/button";
import { Icon } from "@/components/layout/icon/icon";
import Translate from "@/components/layout/translate/translate";

export function AddProjectModal() {
  const handleOpenModal = () => {
    console.log("Open modal");
  };

  return (
    <Button onClick={handleOpenModal} size="s">
      <Icon remixName="ri-magic-line" size={14} />
      <Translate token="project.details.create.submit.button" />
    </Button>
  );
}

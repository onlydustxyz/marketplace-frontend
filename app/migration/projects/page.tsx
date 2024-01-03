import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";
import React from "react";
import PageClient from "./page-client.tsx";

async function ProjectsPage() {
  return (
    <Flex>
      <Typography variant="title-xl">ProjectsPage</Typography>
      <PageClient />
    </Flex>
  );
}

export default ProjectsPage;

import { useState } from "react";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { useAuth } from "src/hooks/useAuth";
import { ArrayElement } from "src/types";
import { GetProjectsQuery } from "src/__generated/graphql";
import { useT } from "talkr";
import AllProjects from "./AllProjects";
import FilterPanel from "./FilterPanel";

export type Project = ArrayElement<GetProjectsQuery["projects"]>;

export enum ProjectOwnershipType {
  All = "All",
  Mine = "Mine",
}

export default function Projects() {
  const { T } = useT();
  const { ledProjectIds } = useAuth();

  const [technologies, setTechnologies] = useState<string[]>([]);
  const [projectOwnershipType, setProjectOwnershipType] = useState(ProjectOwnershipType.All);

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <div className="md:container md:mx-auto pt-8 xl:pt-16 pb-8 px-4 md:px-12 h-full">
        <div className="hidden xl:block text-5xl font-belwe">{T("navbar.projects")}</div>
        <div className="flex xl:mt-8 gap-6 h-full">
          <div className="hidden xl:block basis-80 shrink-0">
            <FilterPanel
              onTechnologiesChange={setTechnologies}
              projectOwnershipType={projectOwnershipType}
              setProjectOwnershipType={setProjectOwnershipType}
              isProjectLeader={!!ledProjectIds.length}
            />
          </div>
          <AllProjects technologies={technologies} projectOwnershipType={projectOwnershipType} />
        </div>
      </div>
    </Background>
  );
}

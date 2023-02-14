import { useState } from "react";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
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

  const [technologies, setTechnologies] = useState<string[]>([]);
  const [projectOwnershipType, setProjectOwnershipType] = useState(ProjectOwnershipType.All);

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <div className="container mx-auto pt-16 pb-8 h-full">
        <div className="text-5xl font-belwe">{T("navbar.projects")}</div>
        <div className="flex mt-8 gap-6 h-full">
          <div className="basis-80 shrink-0">
            <FilterPanel
              onTechnologiesChange={setTechnologies}
              projectOwnershipType={projectOwnershipType}
              setProjectOwnershipType={setProjectOwnershipType}
            />
          </div>
          <AllProjects technologies={technologies} projectOwnershipType={projectOwnershipType} />
        </div>
      </div>
    </Background>
  );
}

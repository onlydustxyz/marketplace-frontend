import { useState } from "react";
import { ArrayElement } from "src/types";
import { GetProjectsQuery } from "src/__generated/graphql";
import { useT } from "talkr";
import AllProjects from "./AllProjects";
import FilterPanel from "./FilterPanel";

export type Project = ArrayElement<GetProjectsQuery["projects"]>;

export default function Projects() {
  const { T } = useT();

  const [technologies, setTechnologies] = useState<string[]>([]);

  return (
    <div className="bg-space bg-no-repeat bg-fixed h-full rounded-3xl">
      <div className="container mx-auto pt-16 pb-8 h-full">
        <div className="text-5xl font-belwe">{T("navbar.projects")}</div>
        <div className="flex mt-8 gap-6">
          <div className="basis-80 shrink-0">
            <FilterPanel onTechnologiesChange={setTechnologies} />
          </div>
          <AllProjects technologies={technologies} />
        </div>
      </div>
    </div>
  );
}

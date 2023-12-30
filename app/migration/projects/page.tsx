import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";
import { ProjectsActions } from "../../../actions/Projects/projects.actions.ts";
import LabsPagination from "./labsPagination.tsx";

async function ProjectsPage() {
  const paramsObject = {
    pageIndex: 0,
    pageSize: 10,
    mine: false,
    sort: "RANK",
  };

  // await setCookiesParams(ProjectsActions.tags.list, paramsObject);
  const projects = await ProjectsActions.queries.listProjects({
    params: paramsObject,
  });

  return (
    <Flex>
      <Typography variant="title-xl">ProjectsPage</Typography>
      <div className="flex grow flex-col gap-5">
        {projects.projects.map((project, index) => (
          <p className="bg-red-300 p-8" key={project.name}>
            {project.name}
          </p>
        ))}
        {/*  {projects.projects.map((project, index) => {*/}
        {/*  const isFirstHiringProject = index === 0 && project.hiring;*/}
        {/*  return <ProjectCard key={index} project={project} isFirstHiringProject={isFirstHiringProject} />;*/}
        {/*})}*/}
        <LabsPagination {...projects} />
      </div>
    </Flex>
  );
}

export default ProjectsPage;

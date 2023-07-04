import { Listbox } from "@headlessui/react";
import UpDownChevrons from "src/assets/icons/UpDownChevrons";
import { RoutePaths } from "src/App";
import BackLink from "./BackLink";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import { useIntl } from "src/hooks/useIntl";
import { ProjectDetailsTab } from ".";
import { generatePath, NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";
import ProjectOption from "./ProjectOption";

interface Props {
  expandable: boolean;
  currentProject: SidebarProjectDetails;
  allProjects: SidebarProjectDetails[];
  availableTabs: ProjectDetailsTab[];
}

export interface SidebarProjectDetails {
  id: string;
  name: string;
  logoUrl: string;
  withInvitation: boolean;
  contributorsCount: number;
}

export default function View({ expandable, currentProject, allProjects, availableTabs }: Props) {
  const { T } = useIntl();
  const navigate = useNavigate();

  return (
    <div
      className={"ml-6 flex w-80 shrink-0 flex-col gap-6 rounded-l-2xl bg-white/4 bg-noise-medium p-6 font-walsheim"}
    >
      <BackLink to={RoutePaths.Projects} className="divide-none">
        {T("project.details.sidebar.backToProjects")}
      </BackLink>
      <div className="flex w-full flex-col gap-6 divide-y divide-neutral-700">
        <div className="relative h-16">
          <Listbox
            value={currentProject}
            onChange={project =>
              navigate(
                generatePath(RoutePaths.ProjectDetails, {
                  projectId: project.id,
                })
              )
            }
            disabled={!expandable}
          >
            <div className="absolute z-10 flex w-full flex-col divide-y divide-neutral-700 rounded-2xl border-2 border-neutral-700 bg-white/2 backdrop-blur-4xl">
              <Listbox.Button
                className={`p-4 text-xl font-medium text-greyscale-50 ${expandable ? "hover:cursor-pointer" : ""}`}
              >
                <div className="flex flex-row items-center gap-4">
                  <RoundedImage src={currentProject?.logoUrl || ""} alt="Project Logo" size={ImageSize.Md} />
                  <div className="grow truncate text-left font-walsheim">{currentProject?.name}</div>
                  {expandable && <UpDownChevrons className="h-5 w-5 fill-greyscale-50/50" />}
                </div>
              </Listbox.Button>
              <Listbox.Options className="flex max-h-116 flex-col divide-y overflow-y-auto rounded-b-2xl scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
                {allProjects.map(project => (
                  <ProjectOption key={project.id} project={project} isSelected={project.id === currentProject?.id} />
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
        <div className="align-start flex flex-col gap-2 pb-2 pt-3 text-xl font-medium">
          {availableTabs.map(tab => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                classNames("rounded-xl px-4 py-2.5 text-base hover:cursor-pointer", {
                  "bg-white/8 text-white": isActive,
                  "text-neutral-400": !isActive,
                })
              }
              data-testid={`${tab.label}-tab`}
              end
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

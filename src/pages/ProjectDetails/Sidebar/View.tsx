import { Listbox } from "@headlessui/react";
import UpDownChevrons from "src/assets/icons/UpDownChevrons";
import { RoutePaths } from "src/App";
import BackLink from "./BackLink";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import { useIntl } from "src/hooks/useIntl";
import { ProjectDetailsTab } from ".";
import { generatePath, NavLink, useNavigate } from "react-router-dom";
import { cn } from "src/utils/cn";
import ProjectOption from "./ProjectOption";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import { components } from "src/__generated/api";
import { UseGetProjectBySlugResponse } from "src/api/Project/queries";

interface Props {
  expandable: boolean;
  currentProject: UseGetProjectBySlugResponse;
  projects: components["schemas"]["ProjectLedShortResponse"][];
  pendingProjects: components["schemas"]["ProjectLedShortResponse"][];
  availableTabs: ProjectDetailsTab[];
  onLinkClick?: () => void;
}

export default function View({
  expandable,
  currentProject,
  availableTabs,
  onLinkClick,
  pendingProjects,
  projects,
}: Props) {
  const { T } = useIntl();
  const navigate = useNavigate();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  return (
    <div
      className={
        "flex w-full shrink-0 flex-col gap-6 bg-white/4 bg-noise-medium p-6 font-walsheim xl:w-80 xl:rounded-l-2xl"
      }
    >
      {isXl && (
        <BackLink to={RoutePaths.Projects} className="divide-none">
          {T("project.details.sidebar.backToProjects")}
        </BackLink>
      )}
      <div className="flex w-full flex-col gap-4 divide-neutral-700 xl:gap-6 xl:divide-y">
        <div className="relative xl:h-16">
          <Listbox
            value={currentProject}
            onChange={project =>
              navigate(
                generatePath(RoutePaths.ProjectDetails, {
                  projectKey: project.slug,
                }),
                { state: { openMenu: true } }
              )
            }
            disabled={!expandable}
          >
            <div className="z-10 flex w-full flex-col divide-y divide-neutral-700 rounded-2xl border-2 border-neutral-700 bg-white/2 bg-whiteFakeOpacity-1 xl:absolute">
              <Listbox.Button
                className={`p-2 text-xl font-medium text-greyscale-50 xl:p-4 ${
                  expandable ? "hover:cursor-pointer" : ""
                }`}
              >
                <div className="flex flex-row items-center gap-4">
                  <RoundedImage src={currentProject?.logoUrl || ""} alt="Project Logo" size={ImageSize.Md} />
                  <div className="grow truncate text-left font-walsheim">{currentProject?.name}</div>
                  {expandable && <UpDownChevrons className="h-5 w-5 fill-greyscale-50/50" />}
                </div>
              </Listbox.Button>
              <Listbox.Options className="flex max-h-[calc(50dvh)] flex-col divide-y overflow-y-auto rounded-b-2xl scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
                {pendingProjects.map(project => (
                  <ProjectOption
                    key={project.id}
                    project={project}
                    isSelected={project.id === currentProject?.id}
                    isInvited
                  />
                ))}
                {projects.map(project => (
                  <ProjectOption
                    key={project.id}
                    project={project}
                    isSelected={project.id === currentProject?.id}
                    isInvited={false}
                  />
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
              onClick={onLinkClick}
              className={({ isActive }) =>
                cn("rounded-xl px-4 py-2.5 text-base hover:cursor-pointer", {
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

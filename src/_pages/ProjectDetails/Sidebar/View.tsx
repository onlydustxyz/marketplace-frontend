import { useAuth0 } from "@auth0/auth0-react";
import { Listbox } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

import GithubLink, { Variant as GithubLinkVariant } from "src/App/Layout/Header/GithubLink";
import { components } from "src/__generated/api";
import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import UpDownChevrons from "src/assets/icons/UpDownChevrons";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import { viewportConfig } from "src/config";
import { cn } from "src/utils/cn";

import { BaseLink } from "components/layout/base-link/base-link";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

import { ProjectDetailsTab } from ".";
import BackLink from "./BackLink";
import ProjectOption from "./ProjectOption";

interface Props {
  expandable: boolean;
  currentProject: UseGetProjectBySlugResponse;
  projects: components["schemas"]["ProjectLinkResponse"][];
  pendingProjects: components["schemas"]["ProjectLinkResponse"][];
  availableTabs: ProjectDetailsTab[];
  onLinkClick?: () => void;
}

export default function View({
  onLinkClick,
  expandable,
  currentProject,
  availableTabs,
  pendingProjects,
  projects,
}: Props) {
  const { isAuthenticated } = useAuth0();
  const { T } = useIntl();
  const router = useRouter();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const currentProjectUrl = currentProject.logoUrl;

  return (
    <div
      className={cn(
        "border-r-2xl xl:border-r-lg relative z-[1] flex w-full shrink-0 flex-col gap-6 overflow-hidden border-black p-6 font-walsheim xl:w-[328px] xl:rounded-l-2xl",
        "before:absolute before:inset-0 before:-z-[2] before:bg-black",
        "after:absolute after:bottom-0 after:left-0 after:top-0 after:-z-[1] after:w-full after:bg-white/4 after:bg-noise-medium xl:after:w-[320px]"
      )}
    >
      {isXl && (
        <BackLink to={NEXT_ROUTER.projects.all} className="divide-none">
          {T("project.details.sidebar.backToProjects")}
        </BackLink>
      )}
      <div className="flex w-full flex-col gap-4 divide-neutral-700 xl:gap-6 xl:divide-y">
        <div className="relative xl:h-16">
          <Listbox
            value={currentProject}
            onChange={project => router.push(NEXT_ROUTER.projects.details.root(project.slug))}
            disabled={!expandable}
          >
            <div className="z-10 flex w-full flex-col divide-y divide-neutral-700 rounded-2xl border-2 border-neutral-700 bg-white/2 bg-whiteFakeOpacity-1 xl:absolute">
              <Listbox.Button
                className={`p-2 text-xl font-medium text-greyscale-50 xl:p-4 ${
                  expandable ? "hover:cursor-pointer" : ""
                }`}
              >
                <div className="flex flex-row items-center gap-4">
                  <RoundedImage src={currentProjectUrl} useLogoFallback alt="Project Logo" size={ImageSize.Md} />
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
            <BaseLink
              onClick={onLinkClick}
              key={tab.path}
              href={tab.path}
              className={cn(
                "rounded-xl px-4 py-2.5 text-base hover:cursor-pointer",
                "text-neutral-400 data-[active=true]:bg-white/8 data-[active=true]:text-white"
              )}
              matchPathOptions={tab.matchPathOptions}
            >
              {tab.label}
            </BaseLink>
          ))}

          {!isAuthenticated ? (
            <div className="border-t border-card-border-medium pt-4 text-base xl:hidden">
              <GithubLink variant={GithubLinkVariant.GreyNoise} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

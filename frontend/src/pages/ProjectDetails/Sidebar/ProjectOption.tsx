import { Listbox } from "@headlessui/react";
import ShootingStar from "src/assets/icons/ShootingStar";
import CheckLine from "src/icons/CheckLine";
import RoundedImage from "src/components/RoundedImage";
import { useIntl } from "src/hooks/useIntl";
import useProjectContributors from "src/hooks/useProjectContributors";
import { SidebarProjectDetails } from "./View";
import { ProjectContributorsFragment } from "src/__generated/graphql";

interface Props {
  project: SidebarProjectDetails & ProjectContributorsFragment;
  isSelected: boolean;
}

export default function ProjectOption({ project, isSelected }: Props) {
  const { T } = useIntl();
  const { contributors } = useProjectContributors(project);
  const nbContributors = contributors.length;

  return (
    <Listbox.Option
      value={project}
      className={`hover:cursor-pointer p-4 hover:bg-white/10 border-neutral-600 duration-300 last:rounded-b-2xl ${
        project.withInvitation && "bg-orange-400/10  hover:bg-amber-700/30"
      } `}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-5 items-center">
          <RoundedImage src={project.logoUrl} alt="Project Logo" />
          <div className="flex flex-col flex-1 justify-self-start truncate">
            <div className="truncate text-base font-medium">{project.name}</div>
            <div className="truncate text-sm font-regular text-slate-400">
              {T("project.details.sidebar.contributors", { count: nbContributors })}
            </div>
          </div>
          <>
            {project.withInvitation ? (
              <div className="flex flex-row px-2 py-1 rounded-2xl bg-orange-400 items-center gap-1 text-xs text-black">
                <ShootingStar />
                <div>{T("project.details.sidebar.newInvite")}</div>
              </div>
            ) : (
              isSelected && <CheckLine className="text-gray-200 text-lg font-normal" />
            )}
          </>
        </div>
        {project.withInvitation && (
          <div className="bg-neutral-100 rounded-xl w-full text-black text-sm text-center p-2">View invite</div>
        )}
      </div>
    </Listbox.Option>
  );
}

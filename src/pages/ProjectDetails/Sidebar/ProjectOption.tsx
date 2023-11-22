import { Listbox } from "@headlessui/react";
import ShootingStar from "src/assets/icons/ShootingStar";
import CheckLine from "src/icons/CheckLine";
import RoundedImage from "src/components/RoundedImage";
import { useIntl } from "src/hooks/useIntl";
import { components } from "src/__generated/api";
import { IMAGES } from "src/assets/img";
import { cn } from "src/utils/cn";
interface Props {
  project: components["schemas"]["ProjectLedShortResponse"];
  isSelected: boolean;
  isInvited: boolean;
}

export default function ProjectOption({ project, isSelected, isInvited }: Props) {
  const { T } = useIntl();

  return (
    <Listbox.Option
      value={project}
      className={cn("border-neutral-600 p-4 duration-300 last:rounded-b-2xl hover:cursor-pointer hover:bg-white/10", {
        "bg-orange-400/10 hover:bg-amber-700/30": isInvited,
      })}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center gap-5">
          <RoundedImage src={project.logoUrl || IMAGES.logo.gradient} alt="Project Logo" />
          <div className="flex flex-1 flex-col justify-self-start truncate">
            <div className="truncate text-base font-medium">{project.name}</div>
            <div className="font-regular truncate text-sm text-slate-400">
              {T("project.details.sidebar.contributors", { count: project.contributorCount })}
            </div>
          </div>
          <>
            {isInvited ? (
              <div className="flex flex-row items-center gap-1 rounded-2xl bg-orange-400 px-2 py-1 text-xs text-black">
                <ShootingStar />
                <div>{T("project.details.sidebar.newInvite")}</div>
              </div>
            ) : (
              isSelected && <CheckLine className="text-lg font-normal text-gray-200" />
            )}
          </>
        </div>
        {isInvited && (
          <div className="w-full rounded-xl bg-neutral-100 p-2 text-center text-sm text-black">
            {T("project.details.sidebar.viewInvite")}
          </div>
        )}
      </div>
    </Listbox.Option>
  );
}

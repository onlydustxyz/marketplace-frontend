import { useIntl } from "src/hooks/useIntl";
import { formatList } from "src/utils/list";
import { ProjectLeadFragment } from "src/__generated/graphql";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { TooltipPosition, withTooltip } from "src/components/Tooltip";
import LockFill from "src/icons/LockFill";

type Props = {
  projectId: string;
  projectName: string;
  projectLeads: ProjectLeadFragment[];
  logoUrl: string;
  private: boolean;
};

const ProjectLeads = ({ leads }: { leads: ProjectLeadFragment[] }) => {
  const { T } = useIntl();

  return (
    <div className="text-sm flex flex-row text-spaceBlue-200 gap-1 items-center pt-0.5">
      {leads.length > 0 && (
        <div className="whitespace-nowrap truncate">
          {T("project.ledBy", { name: leads[0]?.login, count: leads.length })}
        </div>
      )}
      <div
        className="flex flex-row -space-x-1"
        {...withTooltip(formatList(leads.map(lead => lead.login || "")), {
          visible: leads.length > 1,
          position: TooltipPosition.Top,
        })}
      >
        {leads.map(lead => (
          <RoundedImage
            rounding={Rounding.Circle}
            alt={lead.login || ""}
            size={ImageSize.Xxs}
            key={lead.id}
            src={lead.avatarUrl || ""}
          />
        ))}
      </div>
    </div>
  );
};

export default function ProjectTitle({ projectName, projectLeads, logoUrl, private: private_ }: Props) {
  return (
    <div className="flex gap-4 items-start">
      <div className="relative">
        <RoundedImage src={logoUrl} alt="Project Logo" size={ImageSize.Xl} className="mt-1" />
        {private_ && (
          <div className="absolute -right-2.5 -bottom-2.5">
            <PrivateTag />
          </div>
        )}
      </div>
      <div className="min-w-0">
        <div className="text-2xl font-medium font-belwe truncate">{projectName}</div>
        <ProjectLeads leads={projectLeads} />
      </div>
    </div>
  );
}

function PrivateTag() {
  const { T } = useIntl();

  return (
    <div
      className="rounded-full w-5 h-5 p-1 bg-orange-500 text-greyscale-50 text-xs leading-3 hover:outline hover:outline-2 hover:outline-orange-500/30"
      {...withTooltip(T("project.visibility.private.tooltip"))}
    >
      <LockFill />
    </div>
  );
}

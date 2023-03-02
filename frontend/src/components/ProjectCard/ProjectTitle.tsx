import { useIntl } from "src/hooks/useIntl";
import { ProjectLeadFragment } from "src/__generated/graphql";
import RoundedImage, { ImageSize, Rounding } from "../RoundedImage";
import Tooltip, { TooltipPosition } from "../Tooltip";

type Props = {
  projectId: string;
  projectName: string;
  projectLeads: ProjectLeadFragment[];
  logoUrl: string;
};

const ProjectLeads = ({ leads, id }: { leads: ProjectLeadFragment[]; id: string }) => {
  const { T } = useIntl();

  return (
    <div className="text-sm flex flex-row text-spaceBlue-200 gap-1 items-center pt-0.5">
      <div className="whitespace-nowrap truncate">
        {T("project.ledBy", { name: leads[0]?.displayName, count: leads.length })}
      </div>
      <div className="flex flex-row -space-x-1" id={`projectLeads-${id}`}>
        {leads.map(lead => (
          <RoundedImage
            rounding={Rounding.Circle}
            alt={lead.displayName}
            size={ImageSize.Xxs}
            key={lead.displayName}
            src={lead.avatarUrl}
          />
        ))}
      </div>
      {leads.length > 1 && (
        <Tooltip anchorId={`projectLeads-${id}`} position={TooltipPosition.Top}>
          {new Intl.ListFormat("en-US", { style: "narrow" }).format(leads.map(lead => lead.displayName))}
        </Tooltip>
      )}
    </div>
  );
};

export default function ProjectTitle({ projectId, projectName, projectLeads, logoUrl }: Props) {
  return (
    <div className="flex gap-4 items-start">
      <RoundedImage src={logoUrl} alt="Project Logo" size={ImageSize.Xl} className="mt-1" />
      <div className="min-w-0">
        <div className="text-2xl font-medium font-belwe truncate">{projectName}</div>
        <ProjectLeads id={projectId} leads={projectLeads} />
      </div>
    </div>
  );
}

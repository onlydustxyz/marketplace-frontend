import { useIntl } from "src/hooks/useIntl";
import { ProjectLeadFragment } from "src/__generated/graphql";
import RoundedImage, { ImageSize } from "../RoundedImage";

type Props = {
  projectName: string;
  projectLeads: ProjectLeadFragment[];
  logoUrl: string;
};

const ProjectLead = ({ lead }: { lead: ProjectLeadFragment }) => {
  const { T } = useIntl();

  return (
    <div className="text-sm flex flex-row text-spaceBlue-200 gap-1 items-center pt-0.5">
      <div className="whitespace-nowrap">{T("project.ledBy")}</div>
      <div className="truncate">{lead.displayName}</div> <img src={lead.avatarUrl} className="w-4 h-4 rounded-full" />
    </div>
  );
};

export default function ProjectTitle({ projectName, projectLeads, logoUrl }: Props) {
  return (
    <div className="flex gap-4 items-start">
      <RoundedImage src={logoUrl} alt="Project Logo" size={ImageSize.Xl} className="mt-1" />
      <div className="min-w-0">
        <div className="text-2xl font-medium font-belwe truncate">{projectName}</div>
        {projectLeads.length === 1 && <ProjectLead lead={projectLeads[0]} />}
      </div>
    </div>
  );
}

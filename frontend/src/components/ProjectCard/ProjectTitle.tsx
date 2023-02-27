import { useIntl } from "src/hooks/useIntl";
import { ProjectLeadFragment } from "src/__generated/graphql";
import RoundedImage, { ImageSize, Rounding } from "../RoundedImage";

type Props = {
  projectName: string;
  projectLeads: ProjectLeadFragment[];
  logoUrl: string;
};

const ProjectLeads = ({ leads }: { leads: ProjectLeadFragment[] }) => {
  const { T } = useIntl();

  return (
    <div className="text-sm flex flex-row text-spaceBlue-200 gap-1 items-center pt-0.5">
      <div className="whitespace-nowrap truncate">
        {T("project.ledBy", { name: leads[0]?.displayName, count: leads.length })}
      </div>
      <div className="flex flex-row -space-x-1" id="projectLeads">
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
    </div>
  );
};

export default function ProjectTitle({ projectName, projectLeads, logoUrl }: Props) {
  return (
    <div className="flex gap-4 items-start">
      <RoundedImage src={logoUrl} alt="Project Logo" size={ImageSize.Xl} className="mt-1" />
      <div className="min-w-0">
        <div className="text-2xl font-medium font-belwe truncate">{projectName}</div>
        <ProjectLeads leads={projectLeads} />
      </div>
    </div>
  );
}

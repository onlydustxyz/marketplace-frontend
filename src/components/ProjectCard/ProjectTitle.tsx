import { useIntl } from "src/hooks/useIntl";
import { formatList } from "src/utils/list";
import { ProjectLeadFragment } from "src/__generated/graphql";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { TooltipPosition, withTooltip } from "src/components/Tooltip";
import Contributor from "src/components/Contributor";
import PrivateTag from "src/components/PrivateTag";
import config from "src/config";

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
    <div className="flex flex-row items-center gap-1 pt-0.5 text-sm text-spaceBlue-200">
      {leads.length > 0 && (
        <div className="flex flex-row gap-1 truncate whitespace-nowrap">
          {T("project.ledBy", { count: leads.length })}
          {leads.length === 1 && leads[0].login && (
            <Contributor
              contributor={{
                githubUserId: leads[0].githubUserId,
                login: leads[0].login,
                avatarUrl: null,
              }}
              clickable
            />
          )}
        </div>
      )}
      <div
        className="flex flex-row -space-x-1"
        {...withTooltip(formatList(leads.map(lead => lead.login || "")), {
          visible: leads.length > 1,
          position: TooltipPosition.Bottom,
        })}
      >
        {leads.map(lead => (
          <RoundedImage
            rounding={Rounding.Circle}
            alt={lead.login || ""}
            size={ImageSize.Xxs}
            key={lead.id}
            src={lead.avatarUrl ? config.CLOUDFLARE_RESIZE_W_100_PREFIX + lead.avatarUrl : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default function ProjectTitle({ projectName, projectLeads, logoUrl, private: private_ }: Props) {
  return (
    <div className="flex items-start gap-4">
      <div className="relative flex-shrink-0">
        <RoundedImage src={logoUrl} alt="Project Logo" size={ImageSize.Xl} className="mt-1" />
        {private_ && (
          <div className="absolute -bottom-2.5 -right-2.5">
            <PrivateTag />
          </div>
        )}
      </div>
      <div className="overflow-hidden">
        <div className="truncate font-belwe text-2xl font-medium">{projectName}</div>
        <ProjectLeads leads={projectLeads} />
      </div>
    </div>
  );
}

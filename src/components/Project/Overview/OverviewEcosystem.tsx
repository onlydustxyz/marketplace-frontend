import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { useIntl } from "src/hooks/useIntl";
import Section, { SectionIcon } from "./OverviewSection";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import ExternalLink from "src/components/ExternalLink";

interface Props {
  // TODO get ecosystems type when it's available
  ecosystems: UseGetProjectBySlugResponse["sponsors"];
}

export const ProjectOverviewEcosystem = ({ ecosystems }: Props) => {
  const { T } = useIntl();

  return ecosystems?.length ? (
    <Section
      testId="sponsors"
      icon={SectionIcon.Global}
      title={T("project.details.overview.ecosystems", { count: ecosystems?.length ?? 0 })}
    >
      <div className="flex flex-row flex-wrap gap-3">
        {ecosystems.map(ecosystem => (
          <div key={ecosystem.id} className="flex flex-row items-center gap-2 text-sm font-normal">
            <RoundedImage alt={ecosystem.name} rounding={Rounding.Circle} size={ImageSize.Sm} src={ecosystem.logoUrl} />
            {ecosystem.url ? <ExternalLink url={ecosystem.url} text={ecosystem.name} /> : ecosystem.name}
          </div>
        ))}
      </div>
    </Section>
  ) : null;
};

import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { useIntl } from "src/hooks/useIntl";

import { Link } from "components/ds/link/link";

import Section, { SectionIcon } from "./OverviewSection";

interface Props {
  ecosystems: UseGetProjectBySlugResponse["ecosystems"];
}

export const ProjectOverviewEcosystem = ({ ecosystems }: Props) => {
  const { T } = useIntl();

  return ecosystems?.length ? (
    <Section icon={SectionIcon.Global} title={T("project.details.overview.ecosystems", { count: ecosystems.length })}>
      <div className="flex flex-row flex-wrap gap-3">
        {ecosystems.map(({ id, url, name, logoUrl }) => (
          <Link key={id} href={url} className="flex flex-row items-center gap-2 text-sm font-normal">
            <RoundedImage alt={name} rounding={Rounding.Circle} size={ImageSize.Sm} src={logoUrl} />
            {name}
          </Link>
        ))}
      </div>
    </Section>
  ) : null;
};

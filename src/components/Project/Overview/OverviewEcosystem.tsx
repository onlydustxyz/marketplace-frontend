import { useMemo } from "react";

import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";

import { Link } from "components/ds/link/link";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

import Section, { SectionIcon } from "./OverviewSection";

interface Props {
  ecosystems: UseGetProjectBySlugResponse["ecosystems"];
}

export const ProjectOverviewEcosystem = ({ ecosystems }: Props) => {
  const { T } = useIntl();

  const sortedByName = useMemo(() => {
    return [...ecosystems].sort((a, b) => a.name.localeCompare(b.name));
  }, [ecosystems]);

  return sortedByName?.length ? (
    <Section icon={SectionIcon.Global} title={T("project.details.overview.ecosystems", { count: sortedByName.length })}>
      <div className="flex flex-row flex-wrap gap-3">
        {sortedByName.map(({ id, slug, name, logoUrl }) => (
          <Link
            key={id}
            href={NEXT_ROUTER.ecosystems.details.root(slug)}
            className="flex flex-row items-center gap-2 text-sm font-normal"
          >
            <RoundedImage alt={name} rounding={Rounding.Circle} size={ImageSize.Sm} src={logoUrl} />
            {name}
          </Link>
        ))}
      </div>
    </Section>
  ) : null;
};

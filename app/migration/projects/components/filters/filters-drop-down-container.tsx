"use client";

import { FiltersDropDown } from "@/components/ds/drop-down/filters-drop-down";
import { FC, useContext } from "react";
import { IMAGES } from "src/assets/img";
import { ProjectsContext } from "../../context/project.context.tsx";

// TODO add context
export const FiltersDropDownContainer: FC = () => {
  const { filters } = useContext(ProjectsContext);

  const handleTechnologyClick = (_technologies: string[]) => {
    filters.set({ technologies: _technologies });
  };

  const handleSponsorClick = (_sponsors: string[]) => {
    filters.set({ sponsors: _sponsors });
  };

  return (
    <>
      <FiltersDropDown
        title="filter.technologies.all"
        // TODO change svg to webp
        image={IMAGES.svg.technology}
        options={filters.options.technologies}
        value={filters.values.technologies || []}
        onChange={handleTechnologyClick}
      />

      <FiltersDropDown
        title="filter.sponsors.all"
        image={IMAGES.icons.circle}
        options={filters.options.sponsors}
        value={filters.values.sponsors || []}
        onChange={handleSponsorClick}
      />
    </>
  );
};

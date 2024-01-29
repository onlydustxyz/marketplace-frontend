import { useContext } from "react";

import { IMAGES } from "src/assets/img";

import { FiltersDropDown } from "components/ds/drop-down/filters-drop-down";

import { ProjectsContext } from "../../../context/project.context";

export function FiltersSponsors() {
  const { filters } = useContext(ProjectsContext);

  const handleSponsorClick = (sponsors: string[]) => {
    filters.set({ sponsors });
  };

  return (
    <FiltersDropDown
      title="filter.sponsors.all"
      image={IMAGES.icons.circle}
      options={filters.options.sponsors}
      value={filters.values.sponsors || []}
      onChange={handleSponsorClick}
    />
  );
}

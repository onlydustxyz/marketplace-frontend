import { useContext } from "react";
import { FiltersDropDown } from "components/ds/drop-down/filters-drop-down";
import { IMAGES } from "src/assets/img";
import { ProjectsContext } from "../../../context/project.context";

export function FiltersTechnologies() {
  const { filters } = useContext(ProjectsContext);

  const handleTechnologyClick = (technologies: string[]) => {
    filters.set({ technologies });
  };

  return (
    <FiltersDropDown
      title="filter.technologies.all"
      // TODO change svg to webp
      image={IMAGES.svg.technology}
      options={filters.options.technologies}
      value={filters.values.technologies || []}
      onChange={handleTechnologyClick}
    />
  );
}

import { useContext } from "react";
import { FiltersDropDown } from "@/components/ds/drop-down/filters-drop-down.tsx";
import { IMAGES } from "src/assets/img";
import { ProjectsContext } from "../../../context/project.context.tsx";

function FiltersTechnologies() {
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

export default FiltersTechnologies;

"use client";

import { FiltersDropDown } from "@/components/ds/drop-down/filters-drop-down";
import { FC, useState } from "react";
import Projects from "../../_temp-mock";
import { IMAGES } from "src/assets/img";

// TODO add context
export const FiltersDropDownContainer: FC = () => {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [selectedSponsors, setSelectedSponsors] = useState<string[]>([]);

  const technologies = Object.keys(Projects[0].technologies);
  const sponsors = Projects[0].sponsors.map(sponsor => sponsor.name);

  const handleTechnologyClick = () => {
    console.log("Technology tag selected");
  };

  const handleSponsorClick = () => {
    console.log("Sponsor tag selected");
  };

  return (
    <>
      <FiltersDropDown
        title="filter.technologies.all"
        // TODO change svg to webp
        image={IMAGES.svg.technology}
        options={technologies}
        value={selectedTechnologies}
        onChange={handleTechnologyClick}
      />

      <FiltersDropDown
        title="filter.sponsors.all"
        image={IMAGES.icons.circle}
        options={sponsors}
        value={selectedSponsors}
        onChange={handleSponsorClick}
      />
    </>
  );
};

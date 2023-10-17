import View from "./View";

type Props = {
  isProjectLeader: boolean;
  fromSidePanel?: boolean;
  technologies: string[];
  sponsors: string[];
};

export default function FilterPanel({ isProjectLeader, fromSidePanel, technologies, sponsors }: Props) {
  return (
    <View
      {...{
        availableTechnologies: technologies,
        availableSponsors: sponsors,
        isProjectLeader,
      }}
      fromSidePanel={fromSidePanel}
    />
  );
}

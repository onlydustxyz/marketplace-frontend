type Props = {
  slug: string;
};

export const ProjectOverviewSidePanel = ({ slug }: Props) => {
  return <div className="h-full px-6 py-8 pt-16 lg:pt-8">coucou, {slug}</div>;
};

import Card from "src/components/Card";
import ProjectInformation from "src/components/ProjectInformation";

interface ProjectCardProps {
  name: string;
  budget?: {
    remainingAmount: number;
    initialAmount: number;
  };
  details?: {
    description: string;
    telegramLink: string;
  };
  githubRepoInfo: {
    githubLink: string;
    contributors: { login: string }[];
  };
}

export default function ProjectCard(props: ProjectCardProps) {
  return (
    <Card selectable={true}>
      <ProjectInformation {...props} />
    </Card>
  );
}

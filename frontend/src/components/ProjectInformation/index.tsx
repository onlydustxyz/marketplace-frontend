import { Contributor, LanguageMap } from "src/types";
import { useAuth } from "src/hooks/useAuth";
import ProjectInformationView from "./View";

interface ProjectInformationProps {
  name: string;
  budget?: {
    remainingAmount: number;
    initialAmount: number;
  } | null;
  details?: {
    description?: string | null;
    telegramLink?: string | null;
    logoUrl?: string | null;
  } | null;
  lead?: {
    displayName: string;
    avatarUrl: string;
  } | null;
  githubRepoInfo?: {
    owner?: string;
    name?: string;
    contributors?: Contributor[];
    languages: LanguageMap;
  };
}

export default function ProjectInformation(props: ProjectInformationProps) {
  const { user } = useAuth();
  return <ProjectInformationView {...{ ...props, displayName: user?.displayName }} />;
}

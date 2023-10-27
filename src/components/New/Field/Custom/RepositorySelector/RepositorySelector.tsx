import { FC } from "react";
import { FieldRepositoryGrid } from "./RepositorySelectorGrid";

// TODO : Doc
/**
 * used in https://www.figma.com/file/8PqNt4K2uKLu3DvxF3rVDX/%F0%9F%A7%AA-Only-Dust-%E2%80%A2-Venus?type=design&node-id=10797-233473&mode=design&t=ES631NUQNvE41TSD-4
 */

interface FieldRepositoryRepos {
  name: string;
  shortDescription: string;
  githubId: number;
}

export interface FieldRepositoryOrganisations {
  name: string;
  logoUrl: string;
  repos: FieldRepositoryRepos[];
}

export interface FieldRepositoryProps {
  id: string;
  organisations: FieldRepositoryOrganisations[];
  onChange?: (value: number[]) => void;
  value?: number[];
}

export const FieldRepository: FC<FieldRepositoryProps> = props => {
  return (
    <div className="flex flex-col gap-2">
      <FieldRepositoryGrid {...props} />
    </div>
  );
};

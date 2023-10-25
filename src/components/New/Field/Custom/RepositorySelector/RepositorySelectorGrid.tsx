import { FC } from "react";
import { FieldLabel } from "src/components/New/Field/Label";
import { FieldInfoMessage } from "src/components/New/Field/InfoMessage";
import InformationLine from "src/icons/InformationLine";
import { FieldRepositoryOrganisations, FieldRepositoryProps } from "./RepositorySelector";

export const FieldRepositoryGrid: FC<FieldRepositoryProps> = ({ id, onChange, value, organisations }) => {
  return (
    <div className="flex flex-col gap-2">
      {organisations.map(organisation => (
        <div key={organisation.name} className="bg-whiteFakeOpacity-2">
          coucou
        </div>
      ))}
    </div>
  );
};

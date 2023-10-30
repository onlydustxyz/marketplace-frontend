import { FC } from "react";
import { FieldRepositoryProps } from "./RepositorySelector";
import { Flex } from "src/components/New/Layout/Flex";
import { FieldRepositoryCheckbox, FieldRepositoryCheckboxProps } from "./RepositorySelectorCheckbox";

export const FieldRepositoryGrid: FC<FieldRepositoryProps> = ({ id, onChange, value, organisations }) => {
  const onRepositoryChange = (checkboxValue: FieldRepositoryCheckboxProps) => {
    const valueExist = (value || []).findIndex(v => v === checkboxValue.id);
    if (onChange) {
      if (valueExist !== -1) {
        onChange((value || []).filter(v => v !== checkboxValue.id));
      } else {
        onChange([...(value || []), checkboxValue.id]);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {organisations.map(organisation => (
        <div
          key={organisation.name}
          className="flex flex-col gap-2 rounded-2xl border border-card-border-light bg-card-background-light p-5"
        >
          <div className="grid grid-flow-row grid-cols-2 gap-x-5 gap-y-5">
            {organisation.repos.map(repo => (
              <label key={repo.name}>
                <div className="flex basis-1/2 cursor-pointer flex-col gap-2 rounded-2xl border border-card-border-heavy bg-card-background-heavy p-5 shadow-heavy">
                  <Flex justify="start" item="start" direction="col" gap={2}>
                    <Flex justify="between" item="center">
                      <h3 className="text-body-m-bold">{repo.name}</h3>
                      <FieldRepositoryCheckbox
                        id={repo.githubId}
                        checked={!!value?.find(v => v === repo.githubId)}
                        onChange={onRepositoryChange}
                      />
                    </Flex>
                    <p className="text-body-s text-greyscale-200">{repo.shortDescription}</p>
                  </Flex>
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

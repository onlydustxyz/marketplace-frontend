import { FC } from "react";
import { FieldRepositoryProps } from "./RepositorySelector";
import { Flex } from "src/components/New/Layout/Flex";
import { FieldCheckbox } from "src/components/New/Field/Checkbox";

export const FieldRepositoryGrid: FC<FieldRepositoryProps> = ({ id, onChange, value, organisations }) => {
  return (
    <div className="flex flex-col gap-2">
      {organisations.map(organisation => (
        <div
          key={organisation.name}
          className="border-1 flex flex-col gap-2 rounded-2xl border-greyscale-50/8 bg-white/2 p-5"
        >
          <div className="grid grid-flow-row grid-cols-2 gap-x-5 gap-y-5">
            {organisation.repos.map(repo => (
              <div
                key={repo.name}
                className="border-1 flex basis-1/2 flex-col gap-2 rounded-2xl border-greyscale-50/20 bg-white/8 p-5"
              >
                <Flex justify="between" item="center">
                  <p className="font-walsheim text-base">{repo.name}</p>
                  <FieldCheckbox
                    onChange={function (value: boolean): void {
                      console.log("value", value);
                    }}
                    name={""}
                  />
                </Flex>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

import { useMemo } from "react";

import { Spinner } from "src/components/Spinner/Spinner";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { RadioGroup } from "components/ds/form/radio-group/radio-group";
import { CheckboxItem } from "components/features/stacks/billing-create-stack/components/checkbox-item/checkbox-item";
import { Flex } from "components/layout/flex/flex";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TBillingCreateStack } from "./billing-create-stack.types";

export function BillingCreateStack({ test }: TBillingCreateStack.Params) {
  const isLoading = false;
  const isDisabled = false;

  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col px-4 pb-8">
        <div className="mb-8">
          <Typography
            variant={"title-m"}
            translate={{ token: "v2.pages.billing_create.title" }}
            className="text-greyscale-50"
          />
        </div>
        <Card background={false} className="p-4">
          <Flex justifyContent="start" direction={"col"} className="gap-8">
            <Flex justifyContent="start" direction={"col"} className="gap-1">
              <Typography
                variant={"title-s"}
                translate={{ token: "v2.pages.billing_create.form.title" }}
                className="text-greyscale-50"
              />
              <Typography
                variant={"body-s"}
                translate={{ token: "v2.pages.billing_create.form.description" }}
                className="text-spaceBlue-200"
              />
            </Flex>
            <Flex justifyContent="start" direction={"col"} className="gap-4">
              <RadioGroup onChange={value => console.log("V", value)} value="coucou">
                <RadioGroup.Item value="value1">
                  {({ isDisabled, isSelected }) => (
                    <CheckboxItem
                      title="title2"
                      list={["item1", "item2"]}
                      icon={{ remixName: "ri-user-2-fill" }}
                      selected={isSelected}
                      disabled={isDisabled}
                    />
                  )}
                </RadioGroup.Item>
                <RadioGroup.Item value="value2">
                  {({ isDisabled, isSelected }) => (
                    <CheckboxItem
                      title="title2"
                      list={["item1", "item2"]}
                      icon={{ remixName: "ri-user-2-fill" }}
                      selected={isSelected}
                      disabled={isDisabled}
                    />
                  )}
                </RadioGroup.Item>
              </RadioGroup>
            </Flex>
          </Flex>
        </Card>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-greyscale-900">
        <div className="flex h-auto w-full items-center justify-between gap-5 border-t border-card-border-light bg-card-background-light px-8 py-6">
          {/* // empty div to keep the flex layout */}
          {isLoading ? <Spinner /> : <div />}
          <div className="flex items-center justify-end gap-5 ">
            <Button variant="primary" size="m" disabled={isDisabled} onClick={onSubmit}>
              <Translate token="v2.pages.billing_create.buttons.save" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

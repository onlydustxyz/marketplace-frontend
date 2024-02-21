import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { IMAGES } from "src/assets/img";
import { Spinner } from "src/components/Spinner/Spinner";
import { useIntl } from "src/hooks/useIntl";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { RadioGroupCustom } from "components/ds/form/radio-group-custom/radio-group-custom";
import { CheckboxItem } from "components/features/stacks/billing-create-stack/components/checkbox-item/checkbox-item";
import { Flex } from "components/layout/flex/flex";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TBillingCreateStack } from "./billing-create-stack.types";

export function BillingCreateStack() {
  const { T } = useIntl();
  const [name, setName] = useState("");
  const [type, setType] = useState<TBillingCreateStack.Choice | "">("");
  const isLoading = false;
  const isDisabled = false;

  const onSubmit = () => {
    console.log("submit", { type, name });
  };

  function onChoiceChange(value: TBillingCreateStack.Choice | "") {
    setType(value);
  }
  function onNameChange(value: string) {
    setName(value);
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col px-4 pb-8">
        <div className="mb-8">
          <Typography
            variant={"title-m"}
            translate={{ token: "v2.pages.settings.billing_create.title" }}
            className="text-greyscale-50"
          />
        </div>
        <motion.div layout={"size"}>
          <Card background={false} className="p-4">
            <Flex justifyContent="start" direction={"col"} className="gap-8">
              <Flex justifyContent="start" direction={"col"} className="gap-1">
                <Typography
                  variant={"title-s"}
                  translate={{ token: "v2.pages.settings.billing_create.form.title" }}
                  className="text-greyscale-50"
                />
                <Typography
                  variant={"body-s"}
                  translate={{ token: "v2.pages.settings.billing_create.form.description" }}
                  className="text-spaceBlue-200"
                />
              </Flex>
              <Flex justifyContent="start" direction={"col"} className="gap-4">
                <RadioGroupCustom<TBillingCreateStack.Choice | ""> onChange={onChoiceChange} value={type}>
                  {({ value, onChange }) => [
                    <CheckboxItem
                      key={TBillingCreateStack.Choice.Individual}
                      title={<Translate token="v2.pages.settings.billing_create.fields.individual.title" />}
                      list={[
                        <Translate key={1} token="v2.pages.settings.billing_create.fields.individual.points.1" />,
                        <Translate key={2} token="v2.pages.settings.billing_create.fields.individual.points.2" />,
                        <Translate key={3} token="v2.pages.settings.billing_create.fields.individual.points.3" />,
                      ]}
                      icon={{ remixName: "ri-user-line" }}
                      disabled={isDisabled}
                      onChange={onChange}
                      selected={value === TBillingCreateStack.Choice.Individual}
                      value={TBillingCreateStack.Choice.Individual}
                      withInput={{
                        onChange: onNameChange,
                        value: name,
                        label: T("v2.pages.settings.billing_create.fields.individual.name.label"),
                        placeholder: T("v2.pages.settings.billing_create.fields.individual.name.placeholder"),
                      }}
                    />,
                    <CheckboxItem
                      key={TBillingCreateStack.Choice.SelfEmployed}
                      title={<Translate token="v2.pages.settings.billing_create.fields.selfEmployed.title" />}
                      list={[
                        <Translate
                          key="v2.pages.settings.billing_create.fields.selfEmployed.points.1"
                          token="v2.pages.settings.billing_create.fields.selfEmployed.points.1"
                        />,
                        <Translate
                          key="v2.pages.settings.billing_create.fields.selfEmployed.points.2"
                          token="v2.pages.settings.billing_create.fields.selfEmployed.points.2"
                        />,
                      ]}
                      icon={{ remixName: "ri-suitcase-line" }}
                      disabled={isDisabled}
                      onChange={onChange}
                      selected={value === TBillingCreateStack.Choice.SelfEmployed}
                      value={TBillingCreateStack.Choice.SelfEmployed}
                      withInput={{
                        onChange: onNameChange,
                        value: name,
                        label: T("v2.pages.settings.billing_create.fields.selfEmployed.name.label"),
                        placeholder: T("v2.pages.settings.billing_create.fields.selfEmployed.name.placeholder"),
                      }}
                    />,
                    <CheckboxItem
                      key={TBillingCreateStack.Choice.Organisation}
                      title={<Translate token="v2.pages.settings.billing_create.fields.organisation.title" />}
                      list={[
                        <Translate
                          key="v2.pages.settings.billing_create.fields.selfEmployed.points.1"
                          token="v2.pages.settings.billing_create.fields.organisation.points.1"
                        />,
                        <Translate
                          key="v2.pages.settings.billing_create.fields.selfEmployed.points.2"
                          token="v2.pages.settings.billing_create.fields.organisation.points.2"
                        />,
                        <Translate
                          key="v2.pages.settings.billing_create.fields.selfEmployed.points.3"
                          token="v2.pages.settings.billing_create.fields.organisation.points.3"
                        />,
                      ]}
                      icon={{ remixName: "ri-vip-crown-line" }}
                      disabled={isDisabled}
                      onChange={onChange}
                      selected={value === TBillingCreateStack.Choice.Organisation}
                      value={TBillingCreateStack.Choice.Organisation}
                      withInput={{
                        onChange: onNameChange,
                        value: name,
                        label: T("v2.pages.settings.billing_create.fields.organisation.name.label"),
                        placeholder: T("v2.pages.settings.billing_create.fields.organisation.name.placeholder"),
                      }}
                    />,
                    <CheckboxItem
                      key={TBillingCreateStack.Choice.Employee}
                      title={<Translate token="v2.pages.settings.billing_create.fields.employee.title" />}
                      list={[
                        <Translate
                          key="v2.pages.settings.billing_create.fields.employee.points.1"
                          token="v2.pages.settings.billing_create.fields.employee.points.1"
                        />,
                        <Translate
                          key="v2.pages.settings.billing_create.fields.employee.points.2"
                          token="v2.pages.settings.billing_create.fields.employee.points.2"
                        />,
                      ]}
                      icon={{ remixName: "ri-team-line" }}
                      disabled={isDisabled}
                      onChange={onChange}
                      selected={value === TBillingCreateStack.Choice.Employee}
                      value={TBillingCreateStack.Choice.Employee}
                      withSelectedComponent={
                        <div className="flex h-auto w-full flex-col items-center justify-start gap-4 p-4 pt-9">
                          <Image
                            src={IMAGES.global.drip}
                            width={39}
                            height={39}
                            alt={T("v2.pages.settings.billing_create.form.title")}
                          />
                          <div className="flex h-auto w-full flex-col items-center justify-start gap-1">
                            <Typography
                              variant={"title-s"}
                              translate={{
                                token: "v2.pages.settings.billing_create.fields.employee.information.title",
                              }}
                              className="text-center text-greyscale-50"
                            />
                            <Typography
                              variant={"body-s"}
                              translate={{
                                token: "v2.pages.settings.billing_create.fields.employee.information.content",
                              }}
                              className="text-center text-greyscale-200"
                            />
                          </div>
                        </div>
                      }
                    />,
                  ]}
                </RadioGroupCustom>
              </Flex>
            </Flex>
          </Card>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-greyscale-900">
        <div className="flex h-auto w-full items-center justify-between gap-5 border-t border-card-border-light bg-card-background-light px-8 py-6">
          {/* // empty div to keep the flex layout */}
          {isLoading ? <Spinner /> : <div />}
          <div className="flex items-center justify-end gap-5 ">
            <Button variant="primary" size="m" disabled={isDisabled} onClick={onSubmit}>
              <Translate token="v2.pages.settings.billing_create.buttons.save" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

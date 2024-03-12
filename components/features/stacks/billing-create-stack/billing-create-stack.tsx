import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import BillingApi from "src/api/BillingProfiles";
import { BillingProfilesTypes } from "src/api/BillingProfiles/type";
import useMutationAlert from "src/api/useMutationAlert";
import { IMAGES } from "src/assets/img";
import { Spinner } from "src/components/Spinner/Spinner";
import { useIntl } from "src/hooks/useIntl";
import { useCloseStack } from "src/libs/react-stack";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { RadioGroupCustom } from "components/ds/form/radio-group-custom/radio-group-custom";
import { CheckboxItem } from "components/features/stacks/billing-create-stack/components/checkbox-item/checkbox-item";
import { Flex } from "components/layout/flex/flex";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { TBillingCreateStack } from "./billing-create-stack.types";

export function BillingCreateStack({ projectId, redirectToProfile }: TBillingCreateStack.Props) {
  const { T } = useIntl();
  const [name, setName] = useState("");
  const [type, setType] = useState<TBillingCreateStack.Choice>("");
  const router = useRouter();
  const closeStack = useCloseStack();
  const { mutate, ...restMutation } = BillingApi.mutations.useCreateBillingProfile({
    options: {
      onSuccess: data => {
        if (redirectToProfile) {
          router.push(NEXT_ROUTER.settings.billing.root(data.id));
        }
        closeStack();
      },
    },
  });

  const isDisabled = useMemo(
    () => type === "" || type === "employee" || restMutation.isPending || !name,
    [type, restMutation.isPending, name]
  );

  useMutationAlert({
    mutation: restMutation,
    success: {
      message: T("v2.pages.stacks.settings.billingCreate.messages.success"),
    },
    error: {
      default: true,
    },
  });

  const onSubmit = () => {
    if (type !== "" && type !== "employee") {
      mutate({
        type,
        name,
        ...(projectId ? { selectForProjects: [projectId] } : {}),
      });
    }
  };

  function onChoiceChange(value: TBillingCreateStack.Choice) {
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
            translate={{ token: "v2.pages.stacks.settings.billingCreate.title" }}
            className="text-greyscale-50"
          />
        </div>
        <motion.div layout={"size"}>
          <Card background={false} className="p-4">
            <Flex justifyContent="start" direction={"col"} className="gap-8">
              <Flex justifyContent="start" direction={"col"} className="gap-1">
                <Typography
                  variant={"title-s"}
                  translate={{ token: "v2.pages.stacks.settings.billingCreate.form.title" }}
                  className="text-greyscale-50"
                />
                <Typography
                  variant={"body-s"}
                  translate={{ token: "v2.pages.stacks.settings.billingCreate.form.description" }}
                  className="text-spaceBlue-200"
                />
              </Flex>
              <Flex justifyContent="start" direction={"col"} className="gap-4">
                <RadioGroupCustom<TBillingCreateStack.Choice | ""> onChange={onChoiceChange} value={type}>
                  {({ value, onChange }) => [
                    <CheckboxItem
                      key={BillingProfilesTypes.type.Individual}
                      title={<Translate token="v2.pages.stacks.settings.billingCreate.fields.individual.title" />}
                      list={[
                        <Translate key={1} token="v2.pages.stacks.settings.billingCreate.fields.individual.points.1" />,
                        <Translate key={2} token="v2.pages.stacks.settings.billingCreate.fields.individual.points.2" />,
                        <Translate key={3} token="v2.pages.stacks.settings.billingCreate.fields.individual.points.3" />,
                      ]}
                      icon={{ remixName: "ri-user-line" }}
                      disabled={isDisabled}
                      onChange={onChange}
                      selected={value === BillingProfilesTypes.type.Individual}
                      value={BillingProfilesTypes.type.Individual}
                      withInput={{
                        onChange: onNameChange,
                        value: name,
                        label: T("v2.pages.stacks.settings.billingCreate.fields.individual.name.label"),
                        placeholder: T("v2.pages.stacks.settings.billingCreate.fields.individual.name.placeholder"),
                      }}
                    />,
                    <CheckboxItem
                      key={BillingProfilesTypes.type.SelfEmployed}
                      title={<Translate token="v2.pages.stacks.settings.billingCreate.fields.selfEmployed.title" />}
                      list={[
                        <Translate
                          key="v2.pages.stacks.settings.billingCreate.fields.selfEmployed.points.1"
                          token="v2.pages.stacks.settings.billingCreate.fields.selfEmployed.points.1"
                        />,
                        <Translate
                          key="v2.pages.stacks.settings.billingCreate.fields.selfEmployed.points.2"
                          token="v2.pages.stacks.settings.billingCreate.fields.selfEmployed.points.2"
                        />,
                      ]}
                      icon={{ remixName: "ri-suitcase-line" }}
                      disabled={isDisabled}
                      onChange={onChange}
                      selected={value === BillingProfilesTypes.type.SelfEmployed}
                      value={BillingProfilesTypes.type.SelfEmployed}
                      withInput={{
                        onChange: onNameChange,
                        value: name,
                        label: T("v2.pages.stacks.settings.billingCreate.fields.selfEmployed.name.label"),
                        placeholder: T("v2.pages.stacks.settings.billingCreate.fields.selfEmployed.name.placeholder"),
                      }}
                    />,
                    <CheckboxItem
                      key={BillingProfilesTypes.type.Company}
                      title={<Translate token="v2.pages.stacks.settings.billingCreate.fields.company.title" />}
                      list={[
                        <Translate
                          key="v2.pages.stacks.settings.billingCreate.fields.company.points.1"
                          token="v2.pages.stacks.settings.billingCreate.fields.company.points.1"
                        />,
                        <Translate
                          key="v2.pages.stacks.settings.billingCreate.fields.company.points.2"
                          token="v2.pages.stacks.settings.billingCreate.fields.company.points.2"
                        />,
                        <Translate
                          key="v2.pages.stacks.settings.billingCreate.fields.company.points.3"
                          token="v2.pages.stacks.settings.billingCreate.fields.company.points.3"
                        />,
                      ]}
                      icon={{ remixName: "ri-vip-crown-line" }}
                      disabled={isDisabled}
                      onChange={onChange}
                      selected={value === BillingProfilesTypes.type.Company}
                      value={BillingProfilesTypes.type.Company}
                      withInput={{
                        onChange: onNameChange,
                        value: name,
                        label: T("v2.pages.stacks.settings.billingCreate.fields.company.name.label"),
                        placeholder: T("v2.pages.stacks.settings.billingCreate.fields.company.name.placeholder"),
                      }}
                    />,
                    <CheckboxItem
                      key={"employee"}
                      title={<Translate token="v2.pages.stacks.settings.billingCreate.fields.employee.title" />}
                      list={[
                        <Translate
                          key="v2.pages.stacks.settings.billingCreate.fields.employee.points.1"
                          token="v2.pages.stacks.settings.billingCreate.fields.employee.points.1"
                        />,
                        <Translate
                          key="v2.pages.stacks.settings.billingCreate.fields.employee.points.2"
                          token="v2.pages.stacks.settings.billingCreate.fields.employee.points.2"
                        />,
                      ]}
                      icon={{ remixName: "ri-team-line" }}
                      disabled={isDisabled}
                      onChange={onChange}
                      selected={value === "employee"}
                      value={"employee"}
                      withSelectedComponent={
                        <div className="flex h-auto w-full flex-col items-center justify-start gap-4 p-4 pt-9">
                          <Image
                            src={IMAGES.global.drip}
                            width={39}
                            height={39}
                            alt={T("v2.pages.stacks.settings.billingCreate.form.title")}
                          />
                          <div className="flex h-auto w-full flex-col items-center justify-start gap-1">
                            <Typography
                              variant={"title-s"}
                              translate={{
                                token: "v2.pages.stacks.settings.billingCreate.fields.employee.information.title",
                              }}
                              className="text-center text-greyscale-50"
                            />
                            <Typography
                              variant={"body-s"}
                              translate={{
                                token: "v2.pages.stacks.settings.billingCreate.fields.employee.information.content",
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
          {restMutation.isPending ? <Spinner /> : <div />}
          <div className="flex items-center justify-end gap-5 ">
            <Button variant="primary" size="m" disabled={isDisabled} onClick={onSubmit}>
              <Translate token="v2.pages.stacks.settings.billingCreate.buttons.save" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { BillingProfileTypeUnion } from "core/domain/billing-profile/billing-profile-contract.types";
import React, { PropsWithChildren, ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";

import { TBillingProfiles } from "app/signup/onboarding/payout-information/components/billing-profiles/billing-profiles.types";

import { Paper } from "components/atoms/paper";
import { RadioGroup } from "components/atoms/radio-group";
import { Typo } from "components/atoms/typo";
import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { Key } from "hooks/translate/use-translate";

export function CustomRadioComponent({
  type,
  children,
}: { type: BillingProfileTypeUnion } & PropsWithChildren): ReactNode {
  const translates: { [key in `${BillingProfileTypeUnion}`]: { title: Key; content: Key[]; icon: RemixIconsName } } = {
    INDIVIDUAL: {
      title: "v2.pages.signup.payoutInformation.fields.individual.title",
      content: [
        "v2.pages.signup.payoutInformation.fields.individual.points.1",
        "v2.pages.signup.payoutInformation.fields.individual.points.2",
        "v2.pages.signup.payoutInformation.fields.individual.points.3",
      ],
      icon: "ri-user-line",
    },
    SELF_EMPLOYED: {
      title: "v2.pages.signup.payoutInformation.fields.selfEmployed.title",
      content: [
        "v2.pages.signup.payoutInformation.fields.selfEmployed.points.1",
        "v2.pages.signup.payoutInformation.fields.selfEmployed.points.2",
      ],
      icon: "ri-user-follow-line",
    },
    COMPANY: {
      title: "v2.pages.signup.payoutInformation.fields.company.title",
      content: [
        "v2.pages.signup.payoutInformation.fields.company.points.1",
        "v2.pages.signup.payoutInformation.fields.company.points.2",
      ],
      icon: "ri-building-line",
    },
  };

  const { title, content, icon } = translates[type] || { title: "", content: "", icon: "" };

  return (
    <Paper size={"s"} container={"3"} classNames={{ base: "flex items-start gap-3 justify-between text-left" }}>
      <Icon
        size={24}
        className="flex h-16 w-16 min-w-16 items-center justify-center rounded-lg border border-container-stroke-separator"
        remixName={icon}
      />
      <div className="flex flex-1 items-center gap-3">
        <div className="flex flex-1 flex-col">
          <Typo size="l" weight={"medium"} translate={{ token: title }} />
          <ul className="list-inside list-disc">
            {content.map(contentKey => (
              <li key={contentKey}>
                <Typo size="s" translate={{ token: contentKey }} />
              </li>
            ))}
          </ul>
        </div>
        {children}
      </div>
    </Paper>
  );
}

export function BillingProfiles(_: TBillingProfiles.Props) {
  const { control, handleSubmit, reset } = useForm<TBillingProfiles.form>({
    resolver: zodResolver(TBillingProfiles.validation),
    defaultValues: {
      name: "",
      type: "INDIVIDUAL" as BillingProfileTypeUnion,
    },
  });

  const types = ["INDIVIDUAL", "SELF_EMPLOYED", "COMPANY"] as BillingProfileTypeUnion[];

  function handleCreateBillingProfile(data: TBillingProfiles.form) {}

  return (
    <form onSubmit={handleSubmit(handleCreateBillingProfile)} className="h-full">
      <Controller
        control={control}
        name={"type"}
        render={({ field: { value, onChange } }) => (
          <div className="flex flex-col gap-4">
            <RadioGroup
              value={value}
              as={CustomRadioComponent}
              onChange={onChange}
              items={types.map(type => ({
                value: type,
                componentProps: { type },
              }))}
            />
          </div>
        )}
      />
    </form>
  );
}

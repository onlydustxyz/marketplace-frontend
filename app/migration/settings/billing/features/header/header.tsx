"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { SettingsHeader } from "app/migration/settings/components/settings-header/settings-header";

import MeApi from "src/api/me";
import { MeTypes } from "src/api/me/types";
import useMutationAlert from "src/api/useMutationAlert";

import { SelectableTag } from "components/ds/form/selectable-tag/selectable-tag";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { THeader } from "./header.types";

export function Header({ initialData }: THeader.Props) {
  const { mutate, ...restMutation } = MeApi.billing.mutations.useUpdateBillingProfileType({});

  const { reset, control, handleSubmit, watch } = useForm<THeader.formData>({
    defaultValues: {},
    mode: "onChange",
  });

  const profile = watch("profile");

  useMutationAlert({
    mutation: restMutation,
    success: {
      message: "Success",
    },
    error: {
      default: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData]);

  function onSubmit(data: THeader.formData) {
    mutate({ type: data.profile });
  }

  function onProfileChange(
    value: MeTypes.billingProfileType | null,
    onChange: (value: MeTypes.billingProfileType | null) => void
  ) {
    if (value) {
      onChange(value);
      handleSubmit(onSubmit)();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SettingsHeader
        title="v2.pages.settings.billing.title"
        subtitle={
          profile === MeTypes.billingProfileType.Individual
            ? "v2.pages.settings.billing.individual.subtitle"
            : "v2.pages.settings.billing.company.subtitle"
        }
      >
        <Controller
          name="profile"
          control={control}
          render={props => (
            <SelectableTag
              {...props.field}
              {...props.fieldState}
              onChange={(value: MeTypes.billingProfileType | null) => {
                onProfileChange(value, props.field.onChange);
              }}
              mode="single"
              options={[
                {
                  value: MeTypes.billingProfileType.Individual,
                  children: <Translate token="v2.pages.settings.billing.typeSwitch.individual" />,
                  icon: props => <Icon remixName="ri-user-line" {...props} />,
                },
                {
                  value: MeTypes.billingProfileType.Company,
                  children: <Translate token="v2.pages.settings.billing.typeSwitch.company" />,
                  icon: props => <Icon remixName="ri-building-line" {...props} />,
                },
              ]}
            />
          )}
        />
      </SettingsHeader>
    </form>
  );
}

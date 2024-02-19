"use client";

import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { SettingsHeader } from "app/settings/components/settings-header/settings-header";

import MeApi from "src/api/me";
import { MeTypes } from "src/api/me/types";
import useMutationAlert from "src/api/useMutationAlert";
import { useIntl } from "src/hooks/useIntl";

import { SelectableTag } from "components/ds/form/selectable-tag/selectable-tag";
import { ConfirmationModal } from "components/ds/modals/confirmation/confirmation";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { THeader } from "./header.types";

export function Header({ initialData }: THeader.Props) {
  const { T } = useIntl();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const { mutate, ...restMutation } = MeApi.billing.mutations.useUpdateBillingProfileType({});

  const { reset, control, handleSubmit, watch } = useForm<THeader.formData>({
    defaultValues: {},
    mode: "onChange",
  });

  const profile = watch("profile");

  useMutationAlert({
    mutation: restMutation,
    success: {
      message:
        profile === MeTypes.billingProfileType.Individual
          ? T("v2.pages.settings.billing.messages.success_to_company")
          : T("v2.pages.settings.billing.messages.success_to_individual"),
    },
    error: {
      default: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData?.profile]);

  function onSubmit() {
    mutate({ type: profile });
  }

  function onOpenConfirmation() {
    setOpenConfirmation(true);
  }

  function onConfirm() {
    handleSubmit(onSubmit)();
  }
  function onCancel() {
    setOpenConfirmation(false);
    reset(initialData);
  }

  function onProfileChange(
    value: MeTypes.billingProfileType | null,
    onChange: (value: MeTypes.billingProfileType | null) => void
  ) {
    if (value) {
      onChange(value);
      onOpenConfirmation();
    }
  }

  const confirmationContents = useMemo(() => {
    if (profile === MeTypes.billingProfileType.Individual) {
      return {
        content: <Translate token="v2.pages.settings.billing.confirmation.to_individual.content" />,
        confirm: <Translate token="v2.pages.settings.billing.confirmation.to_individual.confirmationBtn" />,
        cancel: <Translate token="v2.pages.settings.billing.confirmation.to_individual.cancelBtn" />,
      };
    }

    return {
      content: <Translate token="v2.pages.settings.billing.confirmation.to_company.content" />,
      confirm: <Translate token="v2.pages.settings.billing.confirmation.to_company.confirmationBtn" />,
      cancel: <Translate token="v2.pages.settings.billing.confirmation.to_company.cancelBtn" />,
    };
  }, [profile]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SettingsHeader
          title="v2.pages.settings.billing.title"
          subtitle={
            profile === MeTypes.billingProfileType.Individual
              ? "v2.pages.settings.billing.description_individual"
              : "v2.pages.settings.billing.description_company"
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
      <ConfirmationModal
        open={openConfirmation}
        onClose={onCancel}
        title={<Translate token="v2.pages.settings.billing.confirmation.title" />}
        content={confirmationContents.content}
        buttons={{
          confirm: {
            children: confirmationContents.confirm,
            onClick: onConfirm,
          },
          cancel: {
            children: confirmationContents.cancel,
          },
        }}
      />
    </>
  );
}

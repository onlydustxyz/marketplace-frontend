"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";
import { Key, useIntl } from "src/hooks/useIntl";

import { Flex } from "components/layout/flex/flex";

import { SettingsHeader } from "../components/settings-header/settings-header";
import { PayoutDisclaimer } from "./features/disclaimer/disclaimer";
import { FormFooter } from "./features/form/footer/footer";
import { PayoutForm } from "./features/form/form";
import { REGEX } from "./features/form/form.regex";
import { TPayoutForm } from "./features/form/form.types";
import { formatToData, formatToSchema } from "./features/form/form.utils";

const keys: { [key: string]: Key } = {
  invalidEthereumWallet: "v2.commons.form.errors.wallets.ethereum.invalid",
  invalidStarknetAddress: "v2.commons.form.errors.wallets.starknet.invalid",
  invalidOptimismAddress: "v2.commons.form.errors.wallets.optimism.invalid",
  invalidAptosAddress: "v2.commons.form.errors.wallets.aptos.invalid",
};

const formSchema = z
  .object({
    ethWallet: z
      .union([z.string().regex(REGEX.ethWallet, keys.invalidEthereumWallet), z.string().length(0)])
      .optional(),
    starknetAddress: z
      .union([z.string().regex(REGEX.starknetAddress, keys.invalidStarknetAddress), z.string().length(0)])
      .optional(),
    optimismAddress: z
      .union([z.string().regex(REGEX.optimismAddress, keys.invalidOptimismAddress), z.string().length(0)])
      .optional(),
    aptosAddress: z
      .union([z.string().regex(REGEX.aptosAddress, keys.invalidAptosAddress), z.string().length(0)])
      .optional(),
    sepaAccount: z.object({
      iban: z.string().optional(),
      bic: z.string().optional(),
    }),
  })
  .superRefine(({ sepaAccount }, context) => {
    const { iban, bic } = sepaAccount;
    if ((iban && !bic) || (!iban && bic)) {
      if (!iban) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "IBAN is required when BIC is provided",
          path: ["sepaAccount", "iban"],
        });
      }
      if (!bic) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "BIC is required when IBAN is provided",
          path: ["sepaAccount", "bic"],
        });
      }
    }
  });

// TODO: Change input errors with new components
export default function PayoutPage() {
  const { T } = useIntl();

  const { data } = MeApi.queries.useGetMyPayoutInfo({});

  const formMethods = useForm<TPayoutForm.Data>({
    mode: "all",
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, reset, trigger, watch } = formMethods;

  // We need this to trigger in realtime
  useEffect(() => {
    trigger("sepaAccount.iban");
    trigger("sepaAccount.bic");
  }, [watch("sepaAccount.iban"), watch("sepaAccount.bic")]);

  useEffect(() => {
    if (data) {
      reset(formatToData(data));
    }
  }, [data]);

  const {
    mutate: updateUserPayoutInformation,
    isPending: userPayoutInformationIsPending,
    ...restUpdatePayoutInformationMutation
  } = MeApi.mutations.usePayoutInfo({});

  useMutationAlert({
    mutation: restUpdatePayoutInformationMutation,
    success: {
      message: T("v2.commons.alert.global.success"),
    },
    error: {
      message: T("v2.commons.alert.global.error"),
    },
  });

  const onSubmit = (formData: TPayoutForm.Data) => {
    updateUserPayoutInformation(formatToSchema(formData));
  };

  return (
    <FormProvider {...formMethods}>
      <form id="payout-form" className="flex h-full flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="col" className="scrollbar-sm flex-1 gap-6 overflow-auto pb-4">
          <SettingsHeader title="v2.pages.settings.payout.title" subtitle="v2.pages.settings.payout.subtitle" />

          <Flex direction="col" className="gap-4">
            <PayoutForm />

            <PayoutDisclaimer />
          </Flex>
        </Flex>

        <FormFooter isPending={userPayoutInformationIsPending} />
      </form>
    </FormProvider>
  );
}

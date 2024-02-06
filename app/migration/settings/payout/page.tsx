"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";
import { useIntl } from "src/hooks/useIntl";

import { Flex } from "components/layout/flex/flex";

import { SettingsHeader } from "../components/settings-header/settings-header";
import { PayoutDisclaimer } from "./features/disclaimer/disclaimer";
import { FormFooter } from "./features/form/footer/footer";
import { PayoutForm } from "./features/form/form";
import { REGEX } from "./features/form/form.regex";
import { TPayoutForm } from "./features/form/form.types";
import { formatToData, formatToSchema } from "./features/form/form.utils";

const formSchema = z.object({
  ethWallet: z
    .union([z.string().regex(REGEX.ethWallet, "Invalid Ethereum wallet address or ENS name"), z.string().length(0)])
    .optional(),
  starknetAddress: z
    .union([z.string().regex(REGEX.aptosAddress, "Invalid Starknet wallet address"), z.string().length(0)])
    .optional(),
  optimismAddress: z
    .union([z.string().regex(REGEX.optimismAddress, "Invalid Optimism wallet address"), z.string().length(0)])
    .optional(),
  aptosAddress: z
    .union([z.string().regex(REGEX.aptosAddress, "Invalid Aptos wallet address"), z.string().length(0)])
    .optional(),
  sepaAccount: z
    .object({
      iban: z
        .string()
        .optional()
        .refine(iban => iban === "" || iban, "IBAN is required if BIC is provided"),
      bic: z
        .string()
        .optional()
        .refine(bic => bic === "" || bic, "BIC is required if IBAN is provided"),
    })
    .refine(data => (data.iban && data.bic) || (!data.iban && !data.bic), {
      message: "Both IBAN and BIC must be provided if one is provided.",
      path: ["sepaAccount"],
    }),
});

// TODO: Change input errors with new components
// TODO: zod errors on sepaAccount
export default function PayoutPage() {
  const { T } = useIntl();

  const { data } = MeApi.queries.useGetMyPayoutInfo({});

  const formMethods = useForm<TPayoutForm.Data>({
    mode: "all",
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (data) {
      console.log(formatToData(data));
      reset({
        ...formatToData(data),
      });
    }
  }, [data]);

  const {
    mutate: updateUserPayoutInformation,
    isPending: userPayoutInformationIsPending,
    ...restUpdatePayoutInformationMutation
  } = MeApi.mutations.usePayoutInfo({
    options: {},
  });

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
    console.log(formData, formatToSchema(formData));
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

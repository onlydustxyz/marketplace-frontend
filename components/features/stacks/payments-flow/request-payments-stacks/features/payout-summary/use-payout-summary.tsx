import { useMemo } from "react";
import { Money } from "utils/Money/Money";

import BillingProfilesApi from "src/api/BillingProfiles";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";

import { TPayoutSummary } from "components/features/stacks/payments-flow/request-payments-stacks/features/payout-summary/payout-summary.types";
import { Translate } from "components/layout/translate/translate";

import { useMatchNetworkAndWallet } from "hooks/match-network-and-wallet/use-match-network-and-wallet";

import { Item } from "./components/item/item";

export function usePayoutSummary({ billingProfileId, rewards }: TPayoutSummary.Use) {
  const { data: payoutInfo } = BillingProfilesApi.queries.useGetPayoutInfo({
    params: {
      id: billingProfileId,
    },
  });

  const { wallets } = useMatchNetworkAndWallet({
    wallets: {
      eth: payoutInfo?.ethWallet,
      bankAccount: payoutInfo?.bankAccount,
      optimism: payoutInfo?.optimismAddress,
      aptos: payoutInfo?.aptosAddress,
      starknet: payoutInfo?.starknetAddress,
      near: payoutInfo?.nearAccountId,
      stellar: payoutInfo?.stellarAccountId,
    },
    networks: rewards.map(reward => reward.networks).flat(),
  });

  const payoutSummaryContent = useMemo(
    () => (
      <>
        {wallets?.ETHEREUM?.wallet ? (
          <Item
            label={<Translate token="v2.pages.stacks.request_payments.selectRewards.payouts.etherum" />}
            value={wallets.ETHEREUM.wallet}
            labelIcon={<CurrencyIcons className="h-3 w-3" currency={Money.fromSchema({ code: "ETH" })} />}
          />
        ) : null}
        {wallets?.OPTIMISM?.wallet ? (
          <Item
            label={<Translate token="v2.pages.stacks.request_payments.selectRewards.payouts.optimism" />}
            value={wallets.OPTIMISM.wallet}
            labelIcon={<CurrencyIcons className="h-3 w-3" currency={Money.fromSchema({ code: "OP" })} />}
          />
        ) : null}
        {wallets?.APTOS?.wallet ? (
          <Item
            label={<Translate token="v2.pages.stacks.request_payments.selectRewards.payouts.aptos" />}
            value={wallets.APTOS.wallet}
            labelIcon={<CurrencyIcons className="h-3 w-3" currency={Money.fromSchema({ code: "APT" })} />}
          />
        ) : null}
        {wallets?.STARKNET?.wallet ? (
          <Item
            label={<Translate token="v2.pages.stacks.request_payments.selectRewards.payouts.starknet" />}
            value={wallets.STARKNET.wallet}
            labelIcon={<CurrencyIcons className="h-3 w-3" currency={Money.fromSchema({ code: "STRK" })} />}
          />
        ) : null}
        {wallets?.STELLAR?.wallet ? (
          <Item
            label={<Translate token="v2.pages.stacks.request_payments.selectRewards.payouts.stellar" />}
            value={wallets.STELLAR.wallet}
            labelIcon={<CurrencyIcons className="h-3 w-3" currency={Money.fromSchema({ code: "XLM" })} />}
          />
        ) : null}
        {wallets?.SEPA?.bankAccount?.bic && wallets?.SEPA?.bankAccount?.number ? (
          <div className="flex w-full flex-row items-start justify-between gap-2">
            <Item
              label={<Translate token="v2.pages.stacks.request_payments.selectRewards.payouts.sepaAccount" />}
              value={wallets?.SEPA?.bankAccount?.number}
              labelIcon={<CurrencyIcons className="h-3 w-3" currency={Money.fromSchema({ code: "USD" })} />}
            />
            <Item
              label={<Translate token="v2.pages.stacks.request_payments.selectRewards.payouts.sepaBic" />}
              value={wallets?.SEPA?.bankAccount?.bic}
            />
          </div>
        ) : null}
      </>
    ),
    [wallets]
  );

  return {
    wallets,
    payoutSummaryContent,
  };
}

import { useEffect } from "react";

import { useStackRequestPayments } from "src/App/Stacks/Stacks";
import MeApi from "src/api/me";
import { usePosthog } from "src/hooks/usePosthog";

import { Button } from "components/ds/button/button";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function RequestPayment() {
  const { capture } = usePosthog();
  const [open] = useStackRequestPayments();
  const { data: rewardsPendingInvoice } = MeApi.queries.useGetMePendingInvoices({});
  useEffect(() => {
    if (rewardsPendingInvoice?.rewards?.length) {
      capture("reward_viewed", { pending_request: rewardsPendingInvoice?.rewards?.length });
    }
  }, [rewardsPendingInvoice]);

  function handleOpen() {
    open();
    capture("payments_request_started");
  }

  if (!rewardsPendingInvoice?.rewards?.length) {
    return null;
  }

  return (
    <div className="item-center flex w-full flex-row justify-end">
      <Button variant="primary" onClick={handleOpen} size="s">
        <Translate token="v2.pages.stacks.request_payments.openButton" />
        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-spaceBlue-900 bg-card-background-heavy">
          <Typography variant="body-s-bold">{rewardsPendingInvoice.rewards.length}</Typography>
        </div>
      </Button>
    </div>
  );
}

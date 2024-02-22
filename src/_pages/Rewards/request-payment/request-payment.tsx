import { useStackRequestPayments } from "src/App/Stacks/Stacks";
import MeApi from "src/api/me";

import { Button } from "components/ds/button/button";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function RequestPayment() {
  const [open] = useStackRequestPayments();
  const { data: rewardsPendingInvoice } = MeApi.queries.useGetMePendingInvoices({});

  if (!rewardsPendingInvoice?.rewards?.length) {
    return null;
  }

  return (
    <div className="item-center flex w-full flex-row justify-end">
      <Button variant="multi-color" onClick={open} size="s">
        <Translate token="v2.pages.stacks.request_payments.openButton" />
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-card-background-heavy">
          <Typography variant="body-s-bold">{rewardsPendingInvoice.rewards.length}</Typography>
        </div>
      </Button>
    </div>
  );
}

import { useContext, useEffect } from "react";

import { useStackRequestPayments } from "src/App/Stacks/Stacks";
import { UserRewardsContext } from "src/_pages/Rewards/context/UserRewards";
import { usePosthog } from "src/hooks/usePosthog";

import { Button } from "components/ds/button/button";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function RequestPayment() {
  const { capture } = usePosthog();
  const [open] = useStackRequestPayments();
  const { pendingRequestCount } = useContext(UserRewardsContext);
  useEffect(() => {
    if (pendingRequestCount) {
      capture("reward_list_viewed", { pending_rewards: pendingRequestCount });
    }
  }, [pendingRequestCount]);

  function handleOpen() {
    open();
    capture("payments_request_started");
  }

  return (
    <div className="item-center flex w-full flex-row justify-end">
      <Button variant="primary" onClick={handleOpen} size="s" disabled={!pendingRequestCount} backgroundColor="blue">
        <Translate token="v2.pages.stacks.request_payments.openButton" />
        {pendingRequestCount ? (
          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-spaceBlue-900 bg-card-background-heavy">
            <Typography variant="body-s-bold">{pendingRequestCount}</Typography>
          </div>
        ) : null}
      </Button>
    </div>
  );
}

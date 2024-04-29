import { LazyMotion, domAnimation } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { Transition } from "components/features/stacks/payments-flow/request-payments-stacks/features/payout-summary/components/transition/transition";
import { TPayoutSummary } from "components/features/stacks/payments-flow/request-payments-stacks/features/payout-summary/payout-summary.types";
import { usePayoutSummary } from "components/features/stacks/payments-flow/request-payments-stacks/features/payout-summary/use-payout-summary";
import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { Key } from "hooks/translate/use-translate";

export function PayoutSummary({ billingProfileId, rewards }: TPayoutSummary.Props) {
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(true);

  const { wallets, payoutSummaryContent } = usePayoutSummary({ billingProfileId, rewards, isEdit });

  const showContent = useMemo((): { icon: RemixIconsName; label: Key } => {
    if (show) {
      return {
        icon: "ri-eye-off-line",
        label: "v2.pages.stacks.request_payments.selectRewards.hidePayout",
      };
    }

    return {
      icon: "ri-eye-line",
      label: "v2.pages.stacks.request_payments.selectRewards.showPayout",
    };
  }, [show]);

  const haveWallets = useMemo(() => Object.keys(wallets)?.length, [wallets]);

  function toggleShow() {
    setShow(!show);
  }

  if (!haveWallets) {
    return null;
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full py-6">
        <Transition show={show}>
          <Card background={false} border={"light"} className="relative mb-6">
            <div className="absolute right-4 top-4 flex flex-row items-start justify-end">
              <Link href={NEXT_ROUTER.settings.billing.paymentMethods(billingProfileId)}>
                <Button variant={"secondary"} size={"s"} as="div">
                  <Icon remixName={"ri-pencil-line"} />
                  <Translate token={"v2.pages.stacks.request_payments.selectRewards.editPayout"} />
                </Button>
              </Link>
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-3 pt-2">{payoutSummaryContent}</div>
          </Card>
        </Transition>

        <button
          className="group flex w-full cursor-pointer flex-row items-center justify-between gap-3"
          onClick={toggleShow}
        >
          <div className="h-px flex-1 bg-card-border-medium transition-all group-hover:bg-spacePurple-700" />
          <div className="flex flex-row items-center justify-start gap-1 ">
            <Icon
              remixName={showContent.icon}
              className="text-greyscale-200 transition-all group-hover:text-spacePurple-500"
            />
            <Typography
              variant={"body-s"}
              className="text-greyscale-200 transition-all group-hover:text-spacePurple-500"
              translate={{ token: showContent.label }}
            />
          </div>
          <div className="h-px flex-1 bg-card-border-medium transition-all group-hover:bg-spacePurple-700" />
        </button>
      </div>
    </LazyMotion>
  );
}

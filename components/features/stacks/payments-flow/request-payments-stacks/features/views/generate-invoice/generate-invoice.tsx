import { Spinner } from "src/components/Spinner/Spinner";

import { Button } from "components/ds/button/button";
import { AmountCounter } from "components/features/stacks/payments-flow/request-payments-stacks/components/amount-counter/amount-counter";
import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { Translate } from "components/layout/translate/translate";

import { TGenerateInvoice } from "./generate-invoice.types";

export function GenerateInvoice({ rewardIds, goTo }: TGenerateInvoice.Props) {
  const isLoading = false;
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col overflow-hidden px-1">
        <ScrollView>
          <div className="px-3 pb-28">
            {rewardIds.map(rewardId => (
              <div key={rewardId}>{rewardId}</div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-greyscale-900">
            <AmountCounter total={1000} />
            <div className="flex h-auto w-full items-center justify-between gap-5 border-t border-card-border-light bg-card-background-light px-8 py-6">
              {/* // empty div to keep the flex layout */}
              {isLoading ? <Spinner /> : <div />}
              <div className="flex items-center justify-end gap-5 ">
                <Button variant="secondary" size="m" onClick={() => goTo({ to: TRequestPaymentsStacks.Views.Select })}>
                  <Translate token="v2.pages.stacks.request_payments.form.back" />
                </Button>
                <Button variant="primary" size="m" onClick={() => null}>
                  Send invoice
                </Button>
              </div>
            </div>
          </div>
        </ScrollView>
      </div>
    </div>
  );
}

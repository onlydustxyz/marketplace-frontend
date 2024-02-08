import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";

import { TPaymentsInvoiceStacks } from "./payments-invoice-stacks.types";

export function PaymentsInvoiceStacks({ rewardIds }: TPaymentsInvoiceStacks.Props) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col overflow-hidden px-1">
        <ScrollView>
          <div className="px-3 pb-28">
            {rewardIds.map(rewardId => (
              <div key={rewardId}>{rewardId}</div>
            ))}
          </div>
        </ScrollView>
      </div>
    </div>
  );
}

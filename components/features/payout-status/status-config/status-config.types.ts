import { VariantProps } from "tailwind-variants";

import { DateComparisonResult } from "src/utils/date";

import { tagVariants } from "components/ds/tag/tag.variants";
import { TPayoutStatus } from "components/features/payout-status/payout-status.types";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { Key } from "hooks/translate/use-translate";

export namespace TStatusConfig {
  export interface Props {
    status: TPayoutStatus.PaymentStatusUnion;
    dateRelativeToNow?: DateComparisonResult | undefined;
    date?: string | null;
  }

  export interface ReturnType {
    icon: RemixIconsName;
    labelToken: Key;
    tooltipToken: Key;
    tooltipParams: Record<string, string>;
    borderColor: VariantProps<typeof tagVariants>["borderColor"];
    iconClassName: string;
  }
}

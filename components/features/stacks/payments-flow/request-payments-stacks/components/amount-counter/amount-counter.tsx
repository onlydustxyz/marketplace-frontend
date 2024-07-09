import { Money } from "utils/Money/Money";

import { cn } from "src/utils/cn";

import { Banner } from "components/ds/banner/banner";
import { Card } from "components/ds/card/card";
import { ProgressBar } from "components/ds/progress-bar/progress-bar";
import { Flex } from "components/layout/flex/flex";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TAmountCounter } from "./amount-counter.types";

export function AmountCounter({ limit, total, isCompany, isOverLimit }: TAmountCounter.Props) {
  // const isOverLimit = useMemo(() => total > limit, [limit, total]);
  if (!limit) return null;

  if (isCompany) {
    return (
      <div className="bg-greyscale-900 p-4">
        <Banner
          title={<Translate token={"v2.pages.stacks.request_payments.amount.label_company"} />}
          variant={"medium"}
          hasBorder={false}
          icon={{ remixName: "ri-information-line" }}
          size={"s"}
          endElement={
            <Typography variant="title-m" as="p">
              {
                Money.format({ amount: total, currency: Money.USD, options: { currencyClassName: "od-text-title-s" } })
                  .html
              }
            </Typography>
          }
        />
      </div>
    );
  }

  return (
    <div className="bg-greyscale-900 p-4">
      <Card
        border={false}
        background={"medium"}
        className={cn({
          "bg-orange-800": isOverLimit,
        })}
      >
        <Flex justifyContent="between" alignItems="center" className="gap-1">
          <div className="max-w-[215px] flex-1">
            <Typography
              variant="body-s-bold"
              as="p"
              translate={{ token: "v2.pages.stacks.request_payments.amount.label_individual" }}
            />
          </div>
          <div className="inline-flex flex-col items-start justify-start gap-1">
            <ProgressBar maxValue={limit} value={total} />
            <Typography
              variant="body-s-bold"
              as="p"
              className={cn({
                "text-orange-500": isOverLimit,
              })}
            >
              {`
              ${Money.format({ amount: total, currency: Money.USD }).string}
              /
              ${Money.format({ amount: limit, currency: Money.USD }).string}
              `}
            </Typography>
          </div>
        </Flex>
      </Card>
    </div>
  );
}

import { Money } from "utils/Money";

import { Currency } from "src/types";

import { Banner } from "components/ds/banner/banner";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TAmountCounter } from "./amount-counter.types";

export function AmountCounter({ total }: TAmountCounter.Props) {
  {
    /*TODO enable when backend is ready*/
  }
  {
    /*We hide this counter until we can plug it to the backend and get the correct spent amount*/
  }
  // const isOverLimit = useMemo(() => total > limit, [limit, total]);

  // if (isCompany) {
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
            {Money.format({ amount: total, currency: Money.USD }).string}
            <Typography variant="title-s" as="span">
              &nbsp;{Currency.USD}
            </Typography>
          </Typography>
        }
      />
    </div>
  );
  // }

  // return (
  //   <div className="bg-greyscale-900 p-4">
  //     <Card
  //       border={false}
  //       background={"medium"}
  //       className={cn({
  //         "bg-orange-800": isOverLimit,
  //       })}
  //     >
  //       <Flex justifyContent="between" alignItems="center" className="gap-1">
  //         <div className="max-w-[215px] flex-1">
  //           <Typography
  //             variant="body-s-bold"
  //             as="p"
  //             translate={{ token: "v2.pages.stacks.request_payments.amount.label_individual" }}
  //           />
  //         </div>
  //         <div className="inline-flex flex-col items-start justify-start gap-1">
  //           <ProgressBar maxValue={limit} value={total} />
  //           <Typography
  //             variant="body-s-bold"
  //             as="p"
  //             className={cn({
  //               "text-orange-500": isOverLimit,
  //             })}
  //           >
  //             {`${formatMoneyAmount({ amount: total, currency: "USD", showCurrency: false })} ${
  //               Currency.USD
  //             } / ${formatMoneyAmount({
  //               amount: limit,
  //               currency: "USD",
  //               showCurrency: false,
  //             })} ${Currency.USD}`}
  //           </Typography>
  //         </div>
  //       </Flex>
  //     </Card>
  //   </div>
  // );
}

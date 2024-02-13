import { useState } from "react";

import { useIntl } from "src/hooks/useIntl";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { Checkbox } from "components/ds/checkbox/checkbox";
import { TSelectRewards } from "components/features/stacks/payments-flow/request-payments-stacks/features/views/select-rewards/select-rewards.types";
import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function Mandate({ includedRewards, goTo }: TSelectRewards.Props) {
  const { T } = useIntl();
  const [accepted, setAccepted] = useState(false);

  const onSubmit = () => {
    goTo({ to: TRequestPaymentsStacks.Views.Generate });
  };

  const [termsStart, termsPanel, termsEnd] = T("v2.pages.stacks.request_payments.mandate.terms").split("_");

  function renderAnswers() {
    return (
      <ul>
        {Array.from({ length: 4 }, (_, index) => {
          const token = `v2.pages.stacks.request_payments.mandate.summary.answer_${index + 1}`;
          const [start, bold, end] = T(token).split("_");

          return (
            <li key={token}>
              {start}
              <span className="font-semibold">{bold}</span>
              {end}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col overflow-hidden px-1">
        <ScrollView>
          <div className="px-3 pb-[250px]">
            <div className="mb-8">
              <Typography
                variant={"title-m"}
                translate={{ token: "v2.pages.stacks.request_payments.title" }}
                className="text-greyscale-50"
              />
            </div>
            <Typography
              variant={"title-s"}
              translate={{ token: "v2.pages.stacks.request_payments.mandate.title" }}
              className="mb-4"
            />
            <Card background={false}>
              <p className="prose leading-normal text-greyscale-50">
                <Translate token="v2.pages.stacks.request_payments.mandate.summary.question" />
                <br />
                {renderAnswers()}
              </p>
            </Card>
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-greyscale-900">
            <div className="grid gap-5 border-t border-card-border-light bg-card-background-light px-8 py-6">
              <div className="flex justify-center">
                <Checkbox onValueChange={setAccepted}>
                  {termsStart}
                  <button className="underline" onClick={() => alert("open mandate stack")}>
                    {termsPanel}
                  </button>
                  {termsEnd}
                </Checkbox>
              </div>
              <div className="grid w-full grid-cols-2 gap-5">
                <Button variant="secondary" size="m" className="w-full" onClick={() => goTo({ to: "close" })}>
                  <Translate token="v2.pages.stacks.request_payments.mandate.skip" />
                </Button>
                <Button variant="primary" size="m" className="w-full" onClick={onSubmit} disabled={!accepted}>
                  <Translate
                    token="v2.pages.stacks.request_payments.mandate.confirm"
                    params={{ count: includedRewards?.length }}
                  />
                </Button>
              </div>
            </div>
          </div>
        </ScrollView>
      </div>
    </div>
  );
}

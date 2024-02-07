import { Spinner } from "src/components/Spinner/Spinner";

import { Button } from "components/ds/button/button";
import { Tabs } from "components/ds/tabs/tabs";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function RequestPaymentsStacks() {
  const isLoading = false;
  const isDisabled = false;

  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col px-4 pb-8">
        <div className="mb-8">
          <Typography
            variant={"title-m"}
            translate={{ token: "v2.pages.stacks.request_payments.title" }}
            className="text-greyscale-50"
          />
        </div>
        <Tabs
          mobile={{ title: "coucou", trigger: <p>open on mobile </p> }}
          tabs={[
            { content: "coucou", key: "coucou1", icon: { remixName: "ri-check-line" } },
            {
              content: "coucou2",
              key: "coucou2",
              icon: { remixName: "ri-close-line" },
            },
          ]}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-greyscale-900">
        <div className="flex h-auto w-full items-center justify-between gap-5 border-t border-card-border-light bg-card-background-light px-8 py-6">
          {/* // empty div to keep the flex layout */}
          {isLoading ? <Spinner /> : <div />}
          <div className="flex items-center justify-end gap-5 ">
            <Button variant="primary" size="m" disabled={isDisabled} onClick={onSubmit}>
              <Translate token="v2.pages.stacks.request_payments.form.submit" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

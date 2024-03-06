import { Spinner } from "src/components/Spinner/Spinner";

import { Button } from "components/ds/button/button";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TSelectBillingProfile } from "./select-billing-profile.types";

export function SelectBillingProfile({
  billingProfiles,
  isLoading,
  onSelectBillingProfile,
  goTo,
}: TSelectBillingProfile.Props) {
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
              translate={{ token: "v2.pages.stacks.request_payments.uploadInvoice.guidelinesTitle" }}
              className="mb-4"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-greyscale-900">
            <div className="flex h-auto w-full items-center justify-between gap-5 border-t border-card-border-light bg-card-background-light px-8 py-6">
              {isLoading ? <Spinner /> : <div />}
              <div className="flex items-center justify-end gap-5">
                <Button
                  variant="primary"
                  size="m"
                  className="w-full"
                  // onClick={}
                  // disabled={isPendingUploadInvoice || !selectedFileBlob}
                >
                  <Translate token="v2.pages.stacks.request_payments.form.sendInvoice" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollView>
      </div>
    </div>
  );
}

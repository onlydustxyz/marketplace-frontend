import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import CloseLine from "src/icons/CloseLine";
import { useIntl } from "src/hooks/useIntl";
import Link from "src/icons/Link";
import Input from "src/components/FormInput";
import Toggle from "./Toggle";
import { REGEX_VALID_GITHUB_PULL_REQUEST_URL } from "..";
import EmptyState from "./EmptyState";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function WorkItemSidePanel({ open, setOpen }: Props) {
  const { T } = useIntl();
  const [addOtherPrEnabled, setAddOtherPrEnabled] = useState(true);

  return (
    <Transition
      show={open}
      as={Fragment}
      enter="transform transition ease-in-out duration-300"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transform transition ease-in-out duration-300"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <Dialog onClose={setOpen} as={Fragment}>
        <Dialog.Panel className="fixed z-10 inset-y-0 right-0 w-1/3 flex flex-col bg-greyscale-900 py-8 px-6 gap-8">
          <div className="absolute top-3.5 right-3.5" onClick={() => setOpen(false)}>
            <Button size={ButtonSize.Sm} type={ButtonType.Secondary} iconOnly>
              <CloseLine />
            </Button>
          </div>
          <div className="font-belwe font-normal text-2xl text-greyscale-50">{T("payment.form.workItems.add")}</div>
          <div className="flex flex-col gap-3">
            <Toggle
              enabled={addOtherPrEnabled}
              setEnabled={setAddOtherPrEnabled}
              icon={<Link />}
              label={T("payment.form.workItems.addOtherPR.button")}
            />
            {addOtherPrEnabled && (
              <div className="p-4 flex flex-col gap-2 border border-greyscale-50/12 rounded-lg">
                <div className="font-walsheim font-medium text-base text-greyscale-50">
                  {T("payment.form.workItems.addOtherPR.label")}
                </div>
                <div className="flex flex-row gap-2 items-top">
                  <Input
                    name="otherPrLink"
                    placeholder={T("payment.form.workItems.addOtherPR.placeholder")}
                    options={{
                      pattern: {
                        value: REGEX_VALID_GITHUB_PULL_REQUEST_URL,
                        message: T("payment.form.issueLink.error"),
                      },
                    }}
                  />
                  <div className="-mt-0.5">
                    <Button size={ButtonSize.LgLowHeight} type={ButtonType.Secondary}>
                      {T("payment.form.workItems.addOtherPR.add")}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <EmptyState />
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
}

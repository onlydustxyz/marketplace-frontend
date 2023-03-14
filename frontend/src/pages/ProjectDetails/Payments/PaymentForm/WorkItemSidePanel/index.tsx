import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import CloseLine from "src/icons/CloseLine";
import { useIntl } from "src/hooks/useIntl";
import Link from "src/icons/Link";
import Toggle from "./Toggle";
import EmptyState from "./EmptyState";
import { WorkItem } from "src/components/GithubIssue";
import OtherPrInput from "./OtherPrInput";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onWorkItemAdded: (workItem: WorkItem) => void;
};

export default function WorkItemSidePanel({ open, setOpen, onWorkItemAdded }: Props) {
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
            {addOtherPrEnabled && <OtherPrInput onWorkItemAdded={onWorkItemAdded} />}
          </div>
          <EmptyState />
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
}

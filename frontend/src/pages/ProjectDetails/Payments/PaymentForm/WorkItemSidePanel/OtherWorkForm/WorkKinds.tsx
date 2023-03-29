import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { useIntl } from "src/hooks/useIntl";
import DraftLine from "src/icons/DraftLine";
import ExchangeDollarLine from "src/icons/ExchangeDollarLine";
import MoreLine from "src/icons/MoreLine";
import TeamLine from "src/icons/TeamLine";

type WorkKind = {
  icon: ReactElement;
  labelKey: string;
};

export const WORK_KINDS: WorkKind[] = [
  { icon: <DraftLine />, labelKey: "payment.form.workItems.other.kinds.documentation" },
  { icon: <TeamLine />, labelKey: "payment.form.workItems.other.kinds.meeting" },
  { icon: <ExchangeDollarLine />, labelKey: "payment.form.workItems.other.kinds.subscription" },
  { icon: <MoreLine />, labelKey: "payment.form.workItems.other.kinds.other" },
];

type Props = {
  workKind: WorkKind;
  setWorkKind: (workKind: WorkKind) => void;
};

export default function WorkKinds({ workKind: selectedWorkKind, setWorkKind: setSelectedWorkKind }: Props) {
  const { T } = useIntl();

  return (
    <Listbox onChange={setSelectedWorkKind} value={selectedWorkKind}>
      <Listbox.Options static as="div" className="flex flex-wrap gap-x-2 gap-y-3">
        {WORK_KINDS.map((workKind, index) => (
          <Listbox.Option
            key={index}
            as="div"
            value={workKind}
            className={classNames(
              "flex flex-row gap-1 items-center",
              "py-2 px-3 w-fit text-neutral-100 font-walsheim font-normal text-sm bg-white/8 border border-greyscale-50/8 rounded-xl",
              "hover:cursor-pointer",
              "ui-selected:pseudo-outline-2",
              "ui-selected:before:z-10",
              "ui-selected:before:border-spacePurple-500",
              "ui-selected:border-transparent ui-selected:bg-spacePurple-900"
            )}
          >
            {workKind.icon}
            {T(workKind.labelKey)}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

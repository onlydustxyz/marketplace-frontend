import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import { ChangeEventHandler, useCallback, Fragment, useState } from "react";
import Input from "src/components/FormInput";
import { useIntl } from "src/hooks/useIntl";
import { Contributor } from "src/pages/ProjectDetails/PaymentActions/PaymentForm/types";

type Props = {
  loading: boolean;
  onContributorHandleChange: (handle: string) => void;
  onContributorChange: (contributor: Contributor) => void;
  validateContributorLogin: () => boolean | string;
  contributors: { avatarUrl: string; login: string; id: number }[];
  contributor: Contributor;
};

const View = ({ loading, contributors, onContributorHandleChange, validateContributorLogin }: Props) => {
  const { T } = useIntl();
  const onHandleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      onContributorHandleChange(event.target.value);
    },
    [onContributorHandleChange]
  );
  const onContributorChange = useCallback(
    (contributor: Contributor) => {
      onContributorHandleChange(contributor.login);
    },
    [onContributorHandleChange]
  );
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative z-10">
      <Listbox onChange={onContributorChange}>
        <Listbox.Button as={Fragment}>
          <Input
            label={T("payment.form.contributor.inputLabel")}
            name="contributorHandle"
            placeholder={T("payment.form.contributor.placeholder")}
            options={{
              required: T("form.required"),
              validate: validateContributorLogin,
            }}
            onChange={onHandleChange}
            onFocus={() => setOpened(true)}
            onBlur={() => setOpened(false)}
            loading={loading}
          />
        </Listbox.Button>
        <div
          className={classNames({
            "opacity-0": !opened,
            "opacity-100": opened,
          })}
        >
          <Listbox.Options static className="absolute">
            {contributors.map(contributor => (
              <Listbox.Option key={contributor.id} value={contributor}>
                {contributor.login}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export default View;

import { Transition } from "@headlessui/react";
import { ChangeEventHandler, useCallback, useState } from "react";
import Card from "src/components/Card";
import Contributor from "src/components/Contributor";
import Input from "src/components/FormInput";
import { useIntl } from "src/hooks/useIntl";
import { Contributor as ContributorType } from "src/pages/ProjectDetails/PaymentActions/PaymentForm/types";

type Props = {
  loading: boolean;
  onContributorHandleChange: (handle: string) => void;
  onContributorChange: (contributor: ContributorType) => void;
  validateContributorLogin: () => boolean | string;
  contributors: ContributorType[];
  contributor: ContributorType;
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
    (contributor: ContributorType) => {
      onContributorHandleChange(contributor.login);
    },
    [onContributorHandleChange]
  );
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative w-full">
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
      <Transition
        className="absolute w-full"
        show={opened}
        enter="transition duration-200 ease-out"
        enterFrom="transform -translate-y-1/3 opacity-0"
        enterTo="transform translate-y-0 opacity-100"
        leave="transition duration-200 ease-out"
        leaveFrom="transform translate-y-0 opacity-100"
        leaveTo="transform -translate-y-1/3 opacity-0"
      >
        <Card className="bg-spaceBlue-900" padded={false}>
          {contributors.map(contributor => (
            <div
              key={contributor.id}
              className="px-4 py-3 hover:bg-white/2 cursor-pointer"
              onMouseDown={() => onContributorChange(contributor)}
            >
              <Contributor
                contributor={{
                  avatarUrl: contributor.avatarUrl,
                  login: contributor.login,
                  isRegistered: !!contributor.user?.userId,
                }}
              />
            </div>
          ))}
        </Card>
      </Transition>
    </div>
  );
};

export default View;

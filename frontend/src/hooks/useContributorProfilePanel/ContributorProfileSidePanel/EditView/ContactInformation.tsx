import Input, { Size } from "src/components/FormInput";
import { useFormContext } from "react-hook-form";
import { ReactElement } from "react";
import CloseLine from "src/icons/CloseLine";
import classNames from "classnames";
import EyeLine from "src/icons/EyeLine";
import EyeOffLine from "src/icons/EyeOffLine";

type Props = {
  icon: ReactElement;
  name: string;
  editDisabled?: boolean;
  visibilityName: string;
  visibilityDisabled?: boolean;
};

export default function ContactInformation({ icon, name, editDisabled, visibilityName, visibilityDisabled }: Props) {
  return (
    <Input
      size={Size.Sm}
      withMargin={false}
      name={name}
      prefixComponent={icon}
      suffixComponent={
        <div className="flex flex-row gap-2 absolute right-3">
          <VisibilityButton name={visibilityName} disabled={visibilityDisabled} />
          <ClearFieldButton name={name} disabled={editDisabled} />
        </div>
      }
      inputClassName="pl-9"
      disabled={editDisabled}
    />
  );
}

type CloseButtonProps = {
  name: string;
  disabled?: boolean;
};

function ClearFieldButton({ name, disabled }: CloseButtonProps) {
  const { setValue } = useFormContext();
  return (
    <CloseLine
      className={classNames({
        "text-greyscale-600": disabled,
        "cursor-pointer": !disabled,
      })}
      onClick={e => {
        if (!disabled) {
          e.preventDefault();
          setValue(name, "");
        }
      }}
    />
  );
}

type VisibilityButtonProps = {
  name: string;
  disabled?: boolean;
};

function VisibilityButton({ name, disabled }: VisibilityButtonProps) {
  const { watch, setValue } = useFormContext();
  const visible = watch(name);

  return visible ? (
    <EyeLine
      className={classNames({
        "text-spacePurple-200/50": disabled,
        "text-spacePurple-200 cursor-pointer": !disabled,
      })}
      onClick={e => {
        if (!disabled) {
          e.preventDefault();
          setValue(name, false);
        }
      }}
    />
  ) : (
    <EyeOffLine
      className={classNames({
        "text-greyscale-600": disabled,
        "cursor-pointer": !disabled,
      })}
      onClick={e => {
        if (!disabled) {
          e.preventDefault();
          setValue(name, true);
        }
      }}
    />
  );
}

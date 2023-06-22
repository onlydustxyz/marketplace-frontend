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
  placeholder?: string;
  editDisabled?: boolean;
  visibilityName: string;
  visibilityDisabled?: boolean;
};

export default function ContactInformation({
  icon,
  name,
  placeholder,
  editDisabled,
  visibilityName,
  visibilityDisabled,
}: Props) {
  const { watch } = useFormContext();
  const value = watch(name);

  return (
    <Input
      size={Size.Sm}
      withMargin={false}
      name={name}
      placeholder={placeholder}
      prefixComponent={icon}
      suffixComponent={
        value ? (
          <div className="flex flex-row gap-2 absolute right-3">
            <VisibilityButton name={visibilityName} disabled={visibilityDisabled} />
            <ClearFieldButton name={name} disabled={editDisabled} />
          </div>
        ) : undefined
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
          setValue(name, "", { shouldDirty: true });
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
          setValue(name, false, { shouldDirty: true });
        }
      }}
      data-testid="visibilityToggle"
      data-state="on"
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
          setValue(name, true, { shouldDirty: true });
        }
      }}
      data-testid="visibilityToggle"
      data-state="off"
    />
  );
}

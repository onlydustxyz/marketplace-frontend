import Input, { Size } from "src/components/FormInput";
import { useFormContext } from "react-hook-form";
import { ReactElement } from "react";
import CloseLine from "src/icons/CloseLine";
import classNames from "classnames";
import EyeLine from "src/icons/EyeLine";
import EyeOffLine from "src/icons/EyeOffLine";
import { useIntl } from "src/hooks/useIntl";
import { withTooltip } from "src/components/Tooltip";

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
  const { T } = useIntl();

  return (
    <Input
      size={Size.Sm}
      withMargin={false}
      name={name}
      placeholder={placeholder}
      options={{
        pattern: { value: /^[^/]*$/, message: T("profile.form.contactInfo.error", { channel: placeholder }) },
      }}
      prefixComponent={icon}
      suffixComponent={
        value ? (
          <div className="absolute right-3 flex flex-row gap-2">
            <VisibilityButton name={visibilityName} disabled={visibilityDisabled} />
            <ClearFieldButton name={name} disabled={editDisabled} />
          </div>
        ) : undefined
      }
      inputClassName="pl-9 pr-14"
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
      onClick={() => {
        if (!disabled) {
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
  const { T } = useIntl();

  return visible ? (
    <EyeLine
      className={classNames({
        "text-spacePurple-200/50": disabled,
        "cursor-pointer text-spacePurple-200": !disabled,
      })}
      onClick={() => {
        if (!disabled) {
          setValue(name, false, { shouldDirty: true });
        }
      }}
      {...withTooltip(T("profile.form.contactInfo.visibleTootlip"))}
      data-testid="visibilityToggle"
      data-state="on"
    />
  ) : (
    <EyeOffLine
      className={classNames({
        "text-greyscale-600": disabled,
        "cursor-pointer": !disabled,
      })}
      onClick={() => {
        if (!disabled) {
          setValue(name, true, { shouldDirty: true });
        }
      }}
      {...withTooltip(T("profile.form.contactInfo.hiddenTootlip"))}
      data-testid="visibilityToggle"
      data-state="off"
    />
  );
}

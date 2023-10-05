import React, { FocusEventHandler, KeyboardEventHandler, memo, PropsWithChildren } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import LoaderIcon from "src/assets/icons/Loader";
import ImageCard, { BackgroundNoise, BackgroundPosition, BackgroundSize } from "src/components/ImageCard";
import headerElementBackground from "src/assets/img/alert-bg.png";
import { cn } from "src/utils/cn";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import { Size } from ".";
import { withTooltip } from "src/components/Tooltip";
import { useMediaQuery } from "usehooks-ts";
import { viewportConfig } from "src/config";
import { InputErrorDisplay } from "./types";

type PropsType = {
  label?: string;
  type: string;
  placeholder?: string;
  value?: string | number;
  loading?: boolean;
  error?: {
    message?: string;
    type?: string;
  };
  errorDisplay: InputErrorDisplay;
  register: UseFormRegisterReturn<string>;
  onFocus?: FocusEventHandler<unknown>;
  onKeyDown?: KeyboardEventHandler;
  prefixComponent?: React.ReactNode;
  suffixComponent?: React.ReactNode;
  inputClassName?: string;
  showValidationErrors: boolean;
  requiredForPayment: boolean;
  withMargin: boolean;
  negativeZIndex?: boolean;
  as?: React.ElementType;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  disabled?: boolean;
  size: Size;
} & PropsWithChildren;

enum InputErrorType {
  Pattern = "pattern",
  Validate = "validate",
}

const View: React.FC<PropsType> = ({
  label,
  type = "text",
  placeholder,
  value,
  loading,
  error,
  errorDisplay,
  register,
  onFocus,
  onKeyDown,
  prefixComponent,
  suffixComponent,
  inputClassName,
  showValidationErrors,
  requiredForPayment,
  withMargin,
  children,
  negativeZIndex = false,
  as = "input",
  inputProps,
  disabled,
  size,
}) => {
  const isValidationError = error?.type === InputErrorType.Pattern || error?.type === InputErrorType.Validate;
  const showError = error && (!isValidationError || showValidationErrors) && errorDisplay === InputErrorDisplay.Normal;
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  return (
    <label
      htmlFor={register.name}
      className={cn("flex flex-grow flex-col gap-2 font-walsheim text-greyscale-300", {
        "mb-6": withMargin,
      })}
    >
      {label && (
        <div className="text-sm font-medium tracking-tight">
          {label}
          {requiredForPayment && <span className="pl-0.5 text-orange-500">{"*"}</span>}
        </div>
      )}
      <div
        className={cn("flex flex-col", {
          "gap-8": errorDisplay === InputErrorDisplay.Banner,
        })}
      >
        <div className="relative flex items-center gap-2">
          {React.createElement(as, {
            key: register.name,
            id: register.name,
            placeholder,
            type,
            className: cn(
              "w-full bg-white/5 rounded-xl font-walsheim font-normal",
              { "text-greyscale-50": !disabled, "text-greyscale-600": disabled },
              "border border-greyscale-50/[0.08]",
              "placeholder:text-spaceBlue-200",
              "focus:placeholder:text-spacePurple-200/60 focus:border-spacePurple-500 focus:bg-spacePurple-900",
              {
                "outline outline-1 outline-orange-500": showError,
                "h-11": as === "input" && size === Size.Md,
                "h-8": as === "input" && size === Size.Sm,
                "px-4 py-3 text-base": size === Size.Md,
                "px-3 py-2 text-sm": size === Size.Sm,
                "focus:outline-double focus:outline-spacePurple-500": isXl,
                "focus:outline-none focus:ring-none": !isXl,
              },
              inputClassName
            ),
            value,
            ...register,
            onFocus,
            onKeyDown,
            style: negativeZIndex ? { zIndex: -1 } : {},
            "data-testid": register.name,
            disabled,
            ...inputProps,
          })}
          {prefixComponent && <div className="absolute left-0 ml-3">{prefixComponent}</div>}
          {showError ? (
            <div className="absolute right-0 mr-3 flex text-xl text-orange-400" {...withTooltip(error.message ?? "")}>
              <ErrorWarningLine />
            </div>
          ) : loading ? (
            <LoaderIcon className="absolute right-0 mr-3 flex animate-spin place-items-center" />
          ) : (
            suffixComponent
          )}
          {children}
        </div>
        {error?.message && errorDisplay === InputErrorDisplay.Banner && (
          <div className="flex">
            <ImageCard
              backgroundImageUrl={headerElementBackground}
              backgroundPosition={BackgroundPosition.TopLeft}
              backgroundSize={BackgroundSize.Zoomed}
              backgroundNoise={BackgroundNoise.Light}
            >
              <div className="flex flex-row justify-between px-6 py-5">
                <div className="flex flex-row items-center justify-start gap-4 font-medium text-white">
                  <ErrorWarningLine className="rounded-2xl bg-white/10 px-3 py-2.5 text-3xl" />
                  <div className="flex flex-col ">
                    <div className="text-lg">{error.message.toString()}</div>
                  </div>
                </div>
              </div>
            </ImageCard>
          </div>
        )}
      </div>
    </label>
  );
};

export default memo(View);

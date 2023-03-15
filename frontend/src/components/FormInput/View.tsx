import { FocusEventHandler, KeyboardEventHandler, memo, PropsWithChildren } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import LoaderIcon from "src/assets/icons/Loader";
import ImageCard, {
  BackgroundBlur,
  BackgroundNoise,
  BackgroundPosition,
  BackgroundSize,
} from "src/components/ImageCard";
import headerElementBackground from "src/assets/img/alert-bg.png";
import classNames from "classnames";
import ErrorWarningLine from "src/icons/ErrorWarningLine";

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
} & PropsWithChildren;

export enum InputErrorDisplay {
  Normal = "normal",
  Banner = "banner",
}

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
}) => {
  const isValidationError = error?.type === InputErrorType.Pattern || error?.type === InputErrorType.Validate;
  const showError = error && (!isValidationError || showValidationErrors) && errorDisplay === InputErrorDisplay.Normal;

  return (
    <label
      htmlFor={register.name}
      className={classNames("flex flex-col flex-grow gap-2 text-greyscale-300 font-walsheim", {
        "mb-6": withMargin,
      })}
    >
      {label && (
        <div className="font-medium text-sm tracking-tight">
          {label}
          {requiredForPayment && <span className="text-orange-500 pl-0.5">{"*"}</span>}
        </div>
      )}
      <div
        className={classNames("flex flex-col", {
          "gap-8": errorDisplay === InputErrorDisplay.Banner,
        })}
      >
        <div className="relative flex items-center gap-2">
          <input
            key={register.name}
            id={register.name}
            placeholder={placeholder}
            type={type}
            className={classNames(
              "w-full h-11 bg-white/5 border border-greyscale-50/[0.08] rounded-xl font-walsheim font-normal text-base px-4 py-3 text-greyscale-50 placeholder:text-spaceBlue-200 focus:placeholder:text-spacePurple-200/60 focus:outline-double focus:outline-spacePurple-500 focus:border-spacePurple-500 focus:bg-spacePurple-900",
              { "border outline-1 border-orange-500": showError },
              inputClassName
            )}
            value={value}
            {...register}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            style={negativeZIndex ? { zIndex: -1 } : {}}
          />
          {prefixComponent && <div className="absolute left-0 ml-3">{prefixComponent}</div>}
          {loading ? (
            <LoaderIcon className="flex animate-spin place-items-center absolute right-0 mr-3" />
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
              backgroundBlur={BackgroundBlur.Heavy}
            >
              <div className="flex flex-row justify-between py-5 px-6">
                <div className="flex flex-row justify-start items-center font-medium text-white gap-4">
                  <ErrorWarningLine className="px-3 py-2.5 text-3xl rounded-2xl bg-white/10" />
                  <div className="flex flex-col ">
                    <div className="text-lg">{error.message.toString()}</div>
                  </div>
                </div>
              </div>
            </ImageCard>
          </div>
        )}
      </div>
      {showError && (
        <div className="text-orange-500 text-base flex flex-row items-center gap-1">
          <ErrorWarningLine /> {error?.message?.toString() || "\u00A0"}
        </div>
      )}
    </label>
  );
};

export default memo(View);

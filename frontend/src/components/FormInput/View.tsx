import { ChangeEventHandler, memo } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import LoaderIcon from "src/assets/icons/Loader";
import RiErrorWarningLine from "src/icons/RiErrorWarningLine";
import ImageCard, { BackgroundBlur, BackgroundNoise, BackgroundPosition, BackgroundSize } from "../ImageCard";
import headerElementBackground from "src/assets/img/alert-bg.png";
import classNames from "classnames";

type PropsType = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  value?: string | number;
  loading?: boolean;
  error?: {
    message?: string;
  };
  errorType: InputErrorType;
  register?: UseFormRegisterReturn<string>;
  onChange?: ChangeEventHandler<any>;
};

export enum InputErrorType {
  Normal = "normal",
  Banner = "banner",
}

const View: React.FC<PropsType> = ({
  label,
  type = "text",
  placeholder,
  name,
  value,
  loading,
  error,
  errorType,
  register,
  onChange,
}) => (
  <label html-for={name} className="flex flex-col flex-grow gap-2 text-greyscale-50/70 font-walsheim">
    <div className="font-medium text-sm tracking-tight">{label}</div>
    <div className={classNames("flex flex-col", { "gap-8": errorType === InputErrorType.Banner })}>
      <div className="relative flex items-center">
        <input
          key={name}
          id={name}
          placeholder={placeholder}
          type={type}
          className={classNames(
            "w-full h-11 bg-white/5 border border-greyscale-50/[0.08] rounded-xl font-walsheim font-normal text-base px-4 py-3 placeholder:text-greyscale-50/60 focus:placeholder:text-spacePurple-200/60 focus:outline-double focus:outline-spacePurple-500 focus:border-spacePurple-500 focus:bg-spacePurple-900",
            { "border outline-1 outline-rose-600 border-rose-600": error && errorType === InputErrorType.Normal }
          )}
          value={value}
          {...register}
          onChange={onChange}
        />
        {loading && <LoaderIcon className="flex animate-spin place-items-center absolute right-0 mr-3" />}
      </div>
      {errorType === InputErrorType.Normal && (
        <span className="text-rose-600 text-sm ml-3">{error?.message ? error.message.toString() : "\u00A0"}</span>
      )}
      {error?.message && errorType === InputErrorType.Banner && (
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
                <RiErrorWarningLine className="px-3 py-2.5 text-3xl rounded-2xl bg-white/10" />
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

export default memo(View);

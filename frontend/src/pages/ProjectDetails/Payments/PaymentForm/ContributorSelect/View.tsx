import { Transition } from "@headlessui/react";
import { ChangeEventHandler, useCallback, useState } from "react";
import Card from "src/components/Card";
import Contributor from "src/components/Contributor";
import LoaderIcon from "src/assets/icons/Loader";
import ImageCard, { BackgroundSize } from "src/components/ImageCard";
import headerElementBackground from "src/assets/img/alert-bg.png";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import { useIntl } from "src/hooks/useIntl";
import { GithubContributorFragment } from "src/__generated/graphql";
import classNames from "classnames";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import User3Line from "src/icons/User3Line";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import { useFormContext } from "react-hook-form";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import Tooltip from "src/components/Tooltip";

type Props = {
  loading: boolean;
  onContributorHandleChange: (handle: string) => void;
  validateContributorLogin: () => boolean | string;
  contributors: GithubContributorFragment[];
  contributor?: GithubContributorFragment;
};

const View = ({ loading, contributor, contributors, onContributorHandleChange, validateContributorLogin }: Props) => {
  const { T } = useIntl();
  const onHandleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      onContributorHandleChange(event.target.value);
    },
    [onContributorHandleChange]
  );
  const onContributorChange = useCallback(
    (contributor: GithubContributorFragment) => {
      onContributorHandleChange(contributor.login);
    },
    [onContributorHandleChange]
  );
  const [opened, setOpened] = useState(false);

  const { register, setFocus, watch } = useFormContext();
  const contributorHandle = watch("contributorHandle");

  return (
    <div className="w-full">
      <div className="relative z-10">
        <Transition
          className="absolute w-full -z-10"
          show={opened}
          enter="transition duration-200 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-200 ease-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Card className="bg-spaceBlue-900 pr-1" padded={false}>
            <div className="pt-20">
              <div
                className={classNames(
                  "overflow-auto max-h-60 px-4 divide-y divide-greyscale-50/8",
                  "scrollbar-thin scrollbar-w-1.5 scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded"
                )}
              >
                {contributors.map(contributor => (
                  <div
                    key={contributor.id}
                    className="py-3 hover:bg-white/2 cursor-pointer"
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
              </div>
            </div>
          </Card>
        </Transition>
        <div className="px-4 pt-4">
          <div
            className={classNames(
              "w-full h-11 border rounded-xl px-4 py-3 z-20 mb-8 cursor-text",
              "flex flex-row items-center justify-between",
              "font-walsheim font-normal text-base",
              {
                "border-greyscale-50/8 bg-white/5": !opened,
                "outline outline-1 outline-spacePurple-500 border-spacePurple-500 bg-spacePurple-900": opened,
              }
            )}
            onClick={() => setFocus("contributorHandle")}
          >
            <div className="flex flex-row items-center w-full">
              {contributor && !loading ? (
                <RoundedImage src={contributor.avatarUrl} size={ImageSize.Sm} alt={contributor.login} />
              ) : (
                <User3Line
                  className={classNames({
                    "text-spaceBlue-200": !opened,
                    "text-spacePurple-500": opened,
                  })}
                />
              )}
              <input
                className={classNames("placeholder:text-greyscale-400 bg-transparent border-0 outline-none")}
                placeholder={opened ? undefined : T("payment.form.contributor.placeholder")}
                {...register("contributorHandle", {
                  required: T("form.required"),
                  validate: validateContributorLogin,
                })}
                onChange={onHandleChange}
                onFocus={() => setOpened(true)}
                onBlur={() => setOpened(false)}
                size={contributorHandle ? contributorHandle.length : 30}
              />
              {contributor?.user?.userId && (
                <>
                  <img
                    id={"od-logo-selected"}
                    src={onlyDustLogo}
                    className="h-3.5 mt-px -ml-2"
                    data-tooltip-content={T("contributor.table.userRegisteredTooltip")}
                  />
                  <Tooltip anchorId={"od-logo-selected"}>
                    <div className="w-36">{T("contributor.table.userRegisteredTooltip")}</div>
                  </Tooltip>
                </>
              )}
            </div>
            {loading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <ArrowDownSLine
                className={classNames("text-2xl", {
                  "text-spaceBlue-200": !opened,
                  "text-spacePurple-500": opened,
                })}
              />
            )}
          </div>
        </div>
      </div>
      {contributor && !contributor.user && (
        <div className="h-22 mb-4 mx-4">
          <ImageCard backgroundImageUrl={headerElementBackground} backgroundSize={BackgroundSize.Cover}>
            <div className="flex flex-row justify-between py-5 px-6">
              <div className="flex flex-row justify-start items-center font-medium gap-4">
                <ErrorWarningLine className="px-3 py-2.5 text-3xl rounded-2xl bg-white/10" />
                <div className="flex flex-col ">
                  <div className="text-lg font-medium">
                    {T("payment.form.contributor.needsToSignup", { contributor: contributor.login })}
                  </div>
                </div>
              </div>
            </div>
          </ImageCard>
        </div>
      )}
    </div>
  );
};

export default View;

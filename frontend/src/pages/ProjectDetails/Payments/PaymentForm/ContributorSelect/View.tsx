import { Transition } from "@headlessui/react";
import { ChangeEventHandler, useCallback, useState } from "react";
import Card from "src/components/Card";
import Contributor from "src/components/Contributor";
import LoaderIcon from "src/assets/icons/Loader";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import { useIntl } from "src/hooks/useIntl";
import { GithubContributorFragment } from "src/__generated/graphql";
import classNames from "classnames";
import User3Line from "src/icons/User3Line";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import { useFormContext } from "react-hook-form";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import Tooltip from "src/components/Tooltip";
import { sortBy } from "lodash";
import { useTextWidth } from "@tag0/use-text-width";
import Callout from "src/components/Callout";

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

  const inputTextWidth = useTextWidth({ text: contributorHandle, font: "500 16px GT Walsheim" });

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
                {sortBy(contributors, c => c.login.toLocaleLowerCase()).map(contributor => (
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
              "w-full h-11 border rounded-xl px-4 py-3 z-20 cursor-text",
              "flex flex-row items-center justify-between",
              "font-walsheim font-normal text-base",
              {
                "border-greyscale-50/8 bg-white/5": !opened,
                "outline outline-1 outline-spacePurple-500 border-spacePurple-500 bg-spacePurple-900": opened,
              }
            )}
            onClick={() => setFocus("contributorHandle")}
          >
            <div className="flex flex-row items-center w-full gap-2">
              {contributor && !loading ? (
                <RoundedImage src={contributor.avatarUrl} size={ImageSize.Sm} alt={contributor.login} />
              ) : (
                <User3Line
                  className={classNames("text-2xl", {
                    "text-spaceBlue-200": !opened,
                    "text-spacePurple-500": opened,
                  })}
                />
              )}
              <input
                className={classNames(
                  "placeholder:text-greyscale-400 bg-transparent border-0 outline-none text-greyscale-50 font-walsheim font-medium text-base"
                )}
                placeholder={opened ? undefined : T("payment.form.contributor.placeholder")}
                {...register("contributorHandle", {
                  required: T("form.required"),
                  validate: validateContributorLogin,
                })}
                onChange={onHandleChange}
                onFocus={() => setOpened(true)}
                onBlur={() => setOpened(false)}
                style={{ width: inputTextWidth + 4 || 200, padding: 0 }}
              />
              {contributor?.user?.userId && (
                <>
                  <img
                    id={"od-logo-selected"}
                    src={onlyDustLogo}
                    className="h-3.5 mt-px"
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
        <div className="mx-4 mt-8">
          <Callout>
            <div className="flex flex-col gap-1">
              <span className="text-base font-medium">
                {T("payment.form.contributor.needsToSignup.title", { contributor: contributor.login })}
              </span>
              <span>{T("payment.form.contributor.needsToSignup.details")}</span>
            </div>
          </Callout>
        </div>
      )}
    </div>
  );
};

export default View;

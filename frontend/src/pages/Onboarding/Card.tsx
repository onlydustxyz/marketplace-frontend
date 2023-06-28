import { PropsWithChildren } from "react";
import Button, { ButtonType } from "src/components/Button";
import BaseCard from "src/components/Card";
import Tag, { TagSize } from "src/components/Tag";
import { useIntl } from "src/hooks/useIntl";
import ArrowLeftSLine from "src/icons/ArrowLeftSLine";
import ArrowRightSLine from "src/icons/ArrowRightSLine";
import CheckLine from "src/icons/CheckLine";
import LockFill from "src/icons/LockFill";

type Props = {
  title: string;
  description: string;
  step: number;
  stepCount: number;
  private?: boolean;
  prev?: () => void;
  next?: () => void;
  submit?: boolean;
} & PropsWithChildren;

export default function Card({
  step,
  stepCount,
  title,
  description,
  private: _private,
  prev,
  next,
  submit,
  children,
}: Props) {
  const { T } = useIntl();

  return (
    <div className="w-fit min-h-[670px] flex flex-col pt-1.5 rounded-2xl bg-mosaic bg-contain outline outline-1 outline-greyscale-50/8">
      <BaseCard
        className="flex-1 flex flex-col justify-between gap-12 divide-y divide-greyscale-50/8 bg-whiteFakeOpacity-2"
        padded={false}
        blurred={false}
      >
        <div className="pt-16 px-12 flex flex-col gap-8">
          <div className="w-[600px] flex flex-col gap-4">
            <div className="font-walsheim font-normal text-base text-spaceBlue-100">{`${step}/${stepCount}`}</div>
            {_private && (
              <Tag size={TagSize.Small}>
                <div className="flex flex-row items-center gap-2 text-orange-400">
                  <LockFill />
                  {T("onboarding.privateNotice")}
                </div>
              </Tag>
            )}
            <div className="font-belwe font-normal text-2xl text-greyscale-50">{title}</div>
            <div className="font-walsheim font-normal text-base text-spaceBlue-100">{description}</div>
          </div>
          <div className="flex flex-col gap-6 h-full">{children}</div>
        </div>
        <div className="w-full flex flex-row items-center justify-end gap-6 bg-white/2 p-6 rounded-b-2xl">
          {prev && (
            <Button type={ButtonType.Secondary} onClick={prev}>
              <ArrowLeftSLine className="text-2xl -ml-2" />
              {T("onboarding.backButton")}
            </Button>
          )}
          {next && (
            <Button onClick={next}>
              {T("onboarding.nextButton")}
              <ArrowRightSLine className="text-2xl -mr-2" />
            </Button>
          )}
          {submit && (
            <Button htmlType="submit">
              <CheckLine className="text-2xl -ml-1" /> {T("onboarding.submitButton")}
            </Button>
          )}
        </div>
      </BaseCard>
    </div>
  );
}

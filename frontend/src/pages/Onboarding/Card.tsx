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
    <div className="flex min-h-[670px] w-fit flex-col rounded-2xl bg-mosaic bg-contain pt-1.5 outline outline-1 outline-greyscale-50/8">
      <BaseCard
        className="flex flex-1 flex-col justify-between gap-12 divide-y divide-greyscale-50/8 bg-whiteFakeOpacity-2"
        padded={false}
        blurred={false}
      >
        <div className="flex flex-col gap-8 px-12 pt-16">
          <div className="flex w-[600px] flex-col gap-4">
            <div className="font-walsheim text-base font-normal text-spaceBlue-100">{`${step}/${stepCount}`}</div>
            {_private && (
              <Tag size={TagSize.Small}>
                <div className="flex flex-row items-center gap-2 text-orange-400">
                  <LockFill />
                  {T("onboarding.privateNotice")}
                </div>
              </Tag>
            )}
            <div className="font-belwe text-2xl font-normal text-greyscale-50">{title}</div>
            <div className="font-walsheim text-base font-normal text-spaceBlue-100">{description}</div>
          </div>
          <div className="flex h-full flex-col gap-6">{children}</div>
        </div>
        <div className="flex w-full flex-row items-center justify-end gap-6 rounded-b-2xl bg-white/2 p-6">
          {prev && (
            <Button type={ButtonType.Secondary} onClick={prev}>
              <ArrowLeftSLine className="-ml-2 text-2xl" />
              {T("onboarding.backButton")}
            </Button>
          )}
          {next && (
            <Button onClick={next}>
              {T("onboarding.nextButton")}
              <ArrowRightSLine className="-mr-2 text-2xl" />
            </Button>
          )}
          {submit && (
            <Button htmlType="submit">
              <CheckLine className="-ml-1 text-2xl" /> {T("onboarding.submitButton")}
            </Button>
          )}
        </div>
      </BaseCard>
    </div>
  );
}

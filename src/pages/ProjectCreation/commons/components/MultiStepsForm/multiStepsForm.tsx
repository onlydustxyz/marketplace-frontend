import { FC } from "react";
import { MultiStepsFormProps } from "./multiStepsForm.type";
import Card from "src/components/Card";
import { Link } from "react-router-dom";
import Button, { ButtonType } from "src/components/Button";
import ArrowLeftSLine from "src/icons/ArrowLeftSLine";
import ArrowRightSLine from "src/icons/ArrowRightSLine";
import CheckLine from "src/icons/CheckLine";
import { Flex } from "src/components/New/Layout/Flex";
import { useIntl } from "src/hooks/useIntl";

export const MultiStepsForm: FC<MultiStepsFormProps> = ({
  step,
  stepCount,
  title,
  description,
  footerRightElement,
  prev,
  next,
  submit,
  submitDisabled,
  children,
  stickyChildren,
}) => {
  const { T } = useIntl();

  return (
    <div className="rounded-2x relative h-full w-[688px] max-w-full scroll-mr-2 overflow-auto bg-card-background-base scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
      <div className="sticky top-0 z-20 h-1.5 w-full bg-mosaic bg-cover" />
      <Card
        className="flex flex-1 flex-col justify-between gap-12 divide-y divide-greyscale-50/8 bg-card-background-base"
        padded={false}
      >
        {/* <div className="flex flex-col gap-8 px-8 pb-28 pt-16"> */}
        <div className="flex flex-col">
          {/* // should be sticky */}
          <div className="sticky top-0 z-10 flex flex-col gap-4 bg-card-background-base p-12 pb-5">
            <div className="font-walsheim text-base font-normal text-spaceBlue-100">{`${step}/${stepCount}`}</div>
            <div className="font-belwe text-2xl font-normal text-greyscale-50">{title}</div>
            {description ? (
              <div className="font-walsheim text-base font-normal text-spaceBlue-100">{description}</div>
            ) : null}
            {stickyChildren ? stickyChildren : <div className="h-3" />}
          </div>
          {/* // should not be sticky */}
          <div className="flex h-full flex-col gap-6 px-12">{children}</div>
        </div>
        <Flex
          justify="between"
          item="center"
          gap={4}
          className="sticky inset-x-0  bottom-0 z-10 flex w-full border-t border-card-border-light bg-card-background-base p-6 shadow-medium xl:rounded-b-2xl"
        >
          <Flex justify="start" item="center">
            {footerRightElement ? footerRightElement : null}
          </Flex>
          <Flex justify="end" item="center" gap={6}>
            {prev && (
              <Link to={prev}>
                <Button type={ButtonType.Secondary}>
                  <ArrowLeftSLine className="-ml-2 text-2xl" />
                  {T("common.back")}
                </Button>
              </Link>
            )}
            {next && (
              <Link to={next}>
                <Button>
                  {T("common.next")}
                  <ArrowRightSLine className="-mr-2 text-2xl" />
                </Button>
              </Link>
            )}
            {submit && (
              <Button htmlType="submit" disabled={submitDisabled}>
                <CheckLine className="-ml-1 text-2xl" /> {T("common.publish")}
              </Button>
            )}
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default MultiStepsForm;

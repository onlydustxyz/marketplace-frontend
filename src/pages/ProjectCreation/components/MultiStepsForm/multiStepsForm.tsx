import { FC } from "react";
import { MultiStepsFormProps } from "./multiStepsForm.type";
import Button, { ButtonOnBackground, ButtonType } from "src/components/Button";
import ArrowLeftSLine from "src/icons/ArrowLeftSLine";
import ArrowRightSLine from "src/icons/ArrowRightSLine";
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
  submitButton = null,
  nextDisabled,
  children,
  stickyChildren,
}) => {
  const { T } = useIntl();

  return (
    <div className="relative flex w-full max-w-full flex-col overflow-hidden rounded-2xl bg-card-background-base max-md:min-h-full md:max-h-full md:w-[688px]">
      <div className="w-full bg-mosaic bg-cover pb-1.5" />
      <div className="flex flex-col gap-4 bg-card-background-base p-4 pb-5 pt-6 md:p-12">
        <div className="font-walsheim text-base font-normal text-spaceBlue-100">{`${step}/${stepCount}`}</div>
        <div className="font-belwe text-2xl font-normal text-greyscale-50">{title}</div>
        {description ? (
          <div className="font-walsheim text-base font-normal text-spaceBlue-100">{description}</div>
        ) : null}
        {stickyChildren ? stickyChildren : <div className="h-3" />}
      </div>
      <div className="flex w-full flex-1 flex-col overflow-visible px-4 md:w-auto md:overflow-auto md:px-3">
        <div className="w-full overflow-visible scrollbar-thin scrollbar-thumb-spaceBlue-600 scrollbar-thumb-rounded scrollbar-w-1.5 md:w-auto md:overflow-auto">
          <div className="px-0 pb-4 md:px-9">{children}</div>
        </div>
      </div>
      <Flex
        justify="between"
        item="center"
        gap={4}
        className="fixed bottom-0 left-0 z-10 flex w-full flex-col items-start border-t border-card-border-light bg-card-background-base p-6 shadow-medium md:relative md:bottom-auto md:left-auto md:flex-row md:items-center xl:rounded-b-2xl"
      >
        <Flex justify="start" item="center">
          {footerRightElement ? footerRightElement : null}
        </Flex>
        <Flex justify="end" item="center" gap={6} className="w-full justify-start md:w-auto md:justify-end">
          {prev && (
            <Button type={ButtonType.Secondary} onClick={prev} className="w-full md:w-auto">
              <ArrowLeftSLine className="-ml-2 text-2xl" />
              {T("common.back")}
            </Button>
          )}
          {next && (
            <Button
              disabled={nextDisabled}
              onBackground={ButtonOnBackground.Blue}
              onClick={next}
              className="w-full md:w-auto"
            >
              {T("common.next")}
              <ArrowRightSLine className="-mr-2 text-2xl" />
            </Button>
          )}
          {submitButton}
        </Flex>
      </Flex>
    </div>
  );
};

export default MultiStepsForm;

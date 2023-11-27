import { FC, useContext } from "react";
import { MultiStepsFormProps } from "./multiStepsForm.type";
import Button, { ButtonType } from "src/components/Button";
import ArrowLeftSLine from "src/icons/ArrowLeftSLine";
import ArrowRightSLine from "src/icons/ArrowRightSLine";
import { Flex } from "src/components/New/Layout/Flex";
import { useIntl } from "src/hooks/useIntl";
import { CreateProjectContext } from "../../ProjectCreation.context";

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
  const { PoolingFeedback } = useContext(CreateProjectContext);

  return (
    <div className="relative flex max-h-full w-full max-w-full flex-col overflow-hidden bg-card-background-base md:w-[688px] md:rounded-2xl">
      <div className="hidden w-full bg-mosaic bg-cover pb-1.5 md:block" />
      <div className="flex flex-col gap-4 bg-card-background-base p-12 pb-5">
        <div className="font-walsheim text-base font-normal text-spaceBlue-100">{`${step}/${stepCount}`}</div>
        <div className="font-belwe text-2xl font-normal text-greyscale-50">{title}</div>
        {description ? (
          <div className="font-walsheim text-base font-normal text-spaceBlue-100">{description}</div>
        ) : null}
        {stickyChildren ? stickyChildren : <div className="h-3" />}
      </div>
      <div className="flex flex-1 flex-col overflow-auto px-3">
        <div className="overflow-auto scrollbar-thin scrollbar-thumb-spaceBlue-600 scrollbar-thumb-rounded scrollbar-w-1.5">
          <div className="px-9 pb-4">{children}</div>
        </div>
      </div>
      <Flex
        justify="between"
        item="center"
        gap={4}
        className="z-10 flex w-full border-t border-card-border-light bg-card-background-base p-6 shadow-medium xl:rounded-b-2xl"
      >
        <Flex justify="start" item="center">
          {footerRightElement ? footerRightElement : null}
          {PoolingFeedback}
        </Flex>
        <Flex justify="end" item="center" gap={6}>
          {prev && (
            <Button type={ButtonType.Secondary} onClick={prev}>
              <ArrowLeftSLine className="-ml-2 text-2xl" />
              {T("common.back")}
            </Button>
          )}
          {next && (
            <Button disabled={nextDisabled} onClick={next}>
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

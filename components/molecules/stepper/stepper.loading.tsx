import { ProgressBarLoading } from "components/atoms/progress-bar";

export function StepperLoading({ height }: { height?: string | number }) {
  return (
    <div className="flex w-full items-center gap-2">
      <ProgressBarLoading width="33%" height={height} />
      <ProgressBarLoading width="33%" height={height} />
      <ProgressBarLoading width="33%" height={height} />
    </div>
  );
}

import Background, { BackgroundRoundedBorders } from "src/components/Background";
import Skeleton from "src/components/Skeleton";
import useScrollRestoration from "src/pages/Projects/AllProjects/useScrollRestoration";

export default function RewardLoader() {
  const { ref } = useScrollRestoration();
  return (
    <Background ref={ref} roundedBorders={BackgroundRoundedBorders.Full}>
      <div className="h-full">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 xl:p-8">
          <div className="w-32">
            <Skeleton variant="title" />
          </div>
          <Skeleton variant="invoice" />
          <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-6">
            <Skeleton variant="earnedRewards" />
            <Skeleton variant="earnedRewards" />
            <Skeleton variant="earnedRewards" />
            <Skeleton variant="earnedRewards" />
            <Skeleton variant="earnedRewards" />
            <Skeleton variant="earnedRewards" />
          </div>
          <Skeleton variant="rewards" />
        </div>
      </div>
    </Background>
  );
}

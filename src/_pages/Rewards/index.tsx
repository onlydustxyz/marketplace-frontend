import Background, { BackgroundRoundedBorders } from "src/components/Background";
import SEO from "src/components/SEO";
import UserRewardTable from "src/components/UserRewardTable";
import Flex from "src/components/Utils/Flex";
import { useT } from "talkr";
import { UserRewardsProvider } from "./context/UserRewards.provider";
import { Earning } from "./Earning/Earning";
import { UserRewardsFilter } from "./Filter";
import InvoiceSubmission from "./InvoiceSubmission";

export enum RewardStatus {
  COMPLETE = "COMPLETE",
  PENDING_INVOICE = "PENDING_INVOICE",
  PENDING_SIGNUP = "PENDING_SIGNUP",
  PROCESSING = "PROCESSING",
}

export default function Rewards() {
  const { T } = useT();

  return (
    <UserRewardsProvider>
      <SEO />
      <Background roundedBorders={BackgroundRoundedBorders.Full}>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 xl:p-8">
          <Flex className="items-center justify-between">
            <div className="font-belwe text-3xl xl:text-5xl">{T("navbar.rewards")}</div>
            <UserRewardsFilter />
          </Flex>
          <InvoiceSubmission />
          <Earning />
          <UserRewardTable />
        </div>
      </Background>
    </UserRewardsProvider>
  );
}

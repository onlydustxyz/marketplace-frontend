import Background, { BackgroundRoundedBorders } from "src/components/Background";
import SEO from "src/components/SEO";
import UserRewardTable from "src/components/UserRewardTable";
import { useT } from "talkr";
import { EarningWrapper } from "./Earning/EarningWrapper";
import InvoiceSubmission from "./InvoiceSubmission";
import { useUser } from "@auth0/nextjs-auth0/client";

export enum RewardStatus {
  COMPLETE = "COMPLETE",
  PENDING_INVOICE = "PENDING_INVOICE",
  PENDING_SIGNUP = "PENDING_SIGNUP",
  PROCESSING = "PROCESSING",
}

export default function Rewards() {
  const { T } = useT();

  const { user, error, isLoading } = useUser();

  console.log("user", user);
  console.log("error", error);
  console.log("isLoading", isLoading);

  return (
    <>
      <SEO />
      <Background roundedBorders={BackgroundRoundedBorders.Full}>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 xl:p-8">
          <div className="font-belwe text-3xl xl:text-5xl">{T("navbar.rewards")}</div>
          <InvoiceSubmission />
          <EarningWrapper />
          <UserRewardTable />
        </div>
      </Background>
    </>
  );
}

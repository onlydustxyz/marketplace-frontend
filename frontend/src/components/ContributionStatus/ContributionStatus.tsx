import { useIntl } from "src/hooks/useIntl";
import { ContributionAttribute } from "../ContributionAttribute/ContributionAttribute";

import Check from "src/assets/icons/Check";
import FileChange from "src/assets/icons/FileChange";
import Hourglass from "src/assets/icons/Hourglass";

export enum ContributionStatusEnum {
  PendingReviewer = "pendingReviewer",
  UnderReview = "underReview",
  Approved = "approved",
  ChangesRequested = "changesRequested",
}

export function ContributionStatus({ status }: { status: ContributionStatusEnum }) {
  const { T } = useIntl();

  const dict: Record<string, { icon: React.ReactElement; text: string }> = {
    [ContributionStatusEnum.PendingReviewer]: {
      icon: <Hourglass />,
      text: T("contribution.status.pendingReviewer"),
    },
    [ContributionStatusEnum.UnderReview]: {
      icon: <Hourglass />,
      text: T("contribution.status.underReview"),
    },
    [ContributionStatusEnum.Approved]: {
      icon: <Check />,
      text: T("contribution.status.approved"),
    },
    [ContributionStatusEnum.ChangesRequested]: {
      icon: <FileChange />,
      text: T("contribution.status.changesRequested"),
    },
  };

  return (
    <ContributionAttribute>
      <div className="flex items-center gap-1 font-walsheim text-spaceBlue-100">
        <span>{dict[status].icon}</span>
        <span className="text-sm leading-none">{dict[status].text}</span>
      </div>
    </ContributionAttribute>
  );
}

import { useIntl } from "src/hooks/useIntl";
import { Contributor } from "src/types";
import OverviewPanel from "./OverviewPanel";
import { useOutletContext } from "react-router-dom";
import { ReactNode } from "react";
import { ProjectLeadFragment, SponsorFragment } from "src/__generated/graphql";

type OutletContext = {
  leads?: ProjectLeadFragment[];
  totalSpentAmountInUsd: number;
  contributors?: Contributor[];
  projectId: string;
  sponsors: SponsorFragment[];
  telegramLink: string | null;
  children: ReactNode;
};

const Overview: React.FC = () => {
  const { T } = useIntl();
  const { leads, totalSpentAmountInUsd, contributors, sponsors, telegramLink, children, projectId } =
    useOutletContext<OutletContext>();

  return (
    <div className="flex flex-col gap-8 mt-3">
      <div className="text-3xl font-belwe">{T("project.details.overview.title")}</div>
      {children}
      <div className="flex flex-row gap-5">
        <OverviewPanel {...{ leads, projectId, contributors, totalSpentAmountInUsd, sponsors, telegramLink }} />
      </div>
    </div>
  );
};

export default Overview;

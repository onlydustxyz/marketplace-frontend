import { useIntl } from "src/hooks/useIntl";
import { Section } from "./Section";
import StatCard from "./StatCard";
import { formatMoneyAmount } from "src/utils/money";
import Card from "src/components/Card";
import ArrowRightUpLine from "src/icons/ArrowRightUpLine";
import ContributionGraph from "./ContributionGraph";
import { withTooltip } from "src/components/Tooltip";
import ArrowRightDownLine from "src/icons/ArrowRightDownLine";
import ArrowRightLine from "src/icons/ArrowRightLine";
import { ContributionCountFragment, UserProfileFragment } from "src/__generated/graphql";

type Props = {
  profile: UserProfileFragment;
  contributionCounts: ContributionCountFragment[];
  contributionCountVariationSinceLastWeek: number;
};

export default function StatsSection({ profile, contributionCounts, contributionCountVariationSinceLastWeek }: Props) {
  const { T } = useIntl();

  return (
    <Section title={T("profile.sections.stats.title")}>
      <div className="flex flex-col md:grid grid-cols-3 gap-4">
        <StatCard
          title={T("profile.sections.stats.contributorOn")}
          counter={profile.projectsContributedAggregate.aggregate?.count + ""}
          description={T("profile.sections.stats.projects", {
            count: profile.projectsContributedAggregate.aggregate?.count,
          })}
        />
        <StatCard
          title={T("profile.sections.stats.leadOn")}
          counter={profile.projectsLeaded.length.toString()}
          description={T("profile.sections.stats.projects", { count: profile.projectsLeaded.length })}
        />
        <StatCard
          title={T("profile.sections.stats.granted")}
          counter={formatMoneyAmount({
            amount: profile.paymentStatsAggregate.aggregate?.sum?.moneyGranted || 0,
            notation: "compact",
          })}
        />
        <Card blurred padded={false} className="flex flex-col bg-noise-light px-4 py-2 col-span-3 overflow-visible">
          <div className="flex flex-row items-center gap-3">
            <div className="font-walsheim font-medium text-sm uppercase text-greyscale-300 w-full">
              {T("profile.sections.stats.contributions")}
            </div>
            <div className="font-belwe font-normal text-4xl pb-1 text-greyscale-50">
              {profile.contributionStatsAggregate.aggregate?.sum?.totalCount || 0}
            </div>
            <div
              className="flex flex-row items-center gap-0.5 rounded-full py-0.5 px-2 bg-white/5 border border-greyscale-50/12 backdrop-blur-lg shadow-heavy text-sm"
              {...withTooltip(T("contributionGraph.progressionTooltip"))}
            >
              {contributionCountVariationSinceLastWeek < 0 ? (
                <ArrowRightDownLine className="text-orange-300" />
              ) : contributionCountVariationSinceLastWeek === 0 ? (
                <ArrowRightLine className="text-spacePurple-200" />
              ) : (
                <ArrowRightUpLine className="text-spacePurple-500" />
              )}
              <div className="text-greyscale-200">
                {new Intl.NumberFormat("en-US", {
                  signDisplay: "always",
                }).format(contributionCountVariationSinceLastWeek)}
              </div>
            </div>
          </div>
          <ContributionGraph entries={contributionCounts} />
        </Card>
      </div>
    </Section>
  );
}

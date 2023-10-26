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
import { AvailableConversion, AvailableConversionCurrency } from "src/components/Currency/AvailableConversion";
import { Profile } from "src/hooks/useRestfulProfile/useRestfulProfile";
import { useMemo } from "react";

type Props = {
  profile: Profile;
};

export default function StatsSection({ profile }: Props) {
  const { T } = useIntl();

  const { stats } = profile;

  const contributionCountVariationSinceLastWeek = useMemo(
    () => stats?.contributionCountVariationSinceLastWeek || 0,
    [stats]
  );

  const currenciesStats: AvailableConversionCurrency[] = useMemo(
    () =>
      (stats?.totalsEarned?.details || []).map(currencies => ({
        currency: currencies.currency,
        amount: currencies.totalAmount,
        dollar: currencies.totalDollarsEquivalent,
      })),
    [profile]
  );

  return (
    <Section title={T("profile.sections.stats.title")}>
      <div className="flex grid-cols-3 flex-col gap-4 md:grid">
        <StatCard
          title={T("profile.sections.stats.contributorOn")}
          counter={stats?.contributedProjectCount}
          description={T("profile.sections.stats.projects", {
            count: stats?.contributedProjectCount || 0,
          })}
        />
        <StatCard
          title={T("profile.sections.stats.leadOn")}
          counter={stats?.leadedProjectCount}
          description={T("profile.sections.stats.projects", { count: stats?.leadedProjectCount })}
        />
        <StatCard
          title={T("profile.sections.stats.earned")}
          topLeftComponent={
            <AvailableConversion tooltipId={`${profile.githubUserId}-earned-details`} currencies={currenciesStats} />
          }
          counter={formatMoneyAmount({
            amount: stats?.totalsEarned?.totalAmount || 0,
            notation: "compact",
          })}
        />
        <Card
          withBg={false}
          padded={false}
          className="col-span-3 flex flex-col overflow-visible bg-noise-light px-4 py-2"
        >
          <div className="flex flex-row items-center gap-3">
            <div className="w-full font-walsheim text-sm font-medium uppercase text-greyscale-300">
              {T("profile.sections.stats.contributions")}
            </div>
            <div className="pb-1 font-belwe text-4xl font-normal text-greyscale-50">
              {stats?.contributionCount || 0}
            </div>
            <div
              className="flex flex-row items-center gap-0.5 rounded-full border border-greyscale-50/12 bg-white/5 px-2 py-0.5 text-sm shadow-heavy"
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
          <ContributionGraph entries={stats?.contributionCountPerWeeks || []} />
        </Card>
      </div>
    </Section>
  );
}

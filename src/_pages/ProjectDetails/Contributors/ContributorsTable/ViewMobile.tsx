import { ProjectContributorItem } from "src/api/Project/queries";
import Card from "src/components/Card";
import { AvailableConversion, AvailableConversionCurrency } from "src/components/Currency/AvailableConversion";
import { ShowMore } from "src/components/Table/ShowMore";
import EyeLine from "src/icons/EyeLine";
import EyeOffLine from "src/icons/EyeOffLine";
import Medal2Fill from "src/icons/Medal2Fill";
import SendPlane2Line from "src/icons/SendPlane2Line";
import StackLine from "src/icons/StackLine";

import { Button } from "components/ds/button/button";
import { Contributor } from "components/features/contributor/contributor";
import ActionMenu from "components/layout/action-menu/action-menu";
import { Icon } from "components/layout/icon/icon";

import { useIntl } from "hooks/translate/use-translate";

type ViewMobileProps<C> = {
  contributors: C[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isProjectLeader: boolean;
  onRewardGranted: (contributor: C) => void;
  onToggleContributor: (contributor: C) => void;
};

export function ViewMobile<C extends ProjectContributorItem>({
  contributors,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isProjectLeader,
  onRewardGranted,
  onToggleContributor,
}: ViewMobileProps<C>) {
  const { T } = useIntl();
  return (
    <Card className="divide-y divide-greyscale-50/8 bg-whiteFakeOpacity-5" padded={false}>
      {contributors
        .sort((contributorA, contributorB) => contributorB.contributionCount - contributorA.contributionCount)
        .map(contributor => {
          const { contributionCount, contributionToRewardCount, rewardCount, login, earned, hidden } =
            contributor || {};
          const hasNothing = contributionToRewardCount === 0 && contributionCount === 0;
          const currencies: AvailableConversionCurrency[] = (earned.details || []).map(currency => ({
            currency: currency.currency,
            amount: currency.amount,
            dollar: currency.usdEquivalent,
          }));

          return (
            <div
              className="grid grid-cols-1 items-center justify-between gap-3 p-3 md:grid-cols-2 lg:grid-cols-2"
              key={login}
            >
              <Contributor
                githubUserId={contributor.githubUserId}
                login={contributor.login}
                avatarUrl={contributor.avatarUrl}
                isRegistered={contributor.isRegistered}
                clickable
              />
              <div className="flex items-center justify-end gap-3">
                {!hasNothing ? (
                  <div className="flex flex-1 items-center gap-3 md:justify-end lg:justify-end">
                    {contributionCount > 0 && contributionCount !== contributionToRewardCount ? (
                      <div className="flex items-center gap-1 text-sm">
                        <StackLine className="text-base font-medium text-spaceBlue-200" />
                        {contributionCount}
                      </div>
                    ) : null}
                    {rewardCount ? (
                      <>
                        <div className="flex items-center gap-1 text-sm">
                          <Medal2Fill className="text-base font-medium text-spaceBlue-200" />
                          {rewardCount}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          {earned?.totalAmount ? (
                            <AvailableConversion
                              tooltipId={`${login}-contributors-earned-details`}
                              totalAmount={earned?.totalAmount}
                              currencies={currencies}
                            />
                          ) : (
                            "-"
                          )}
                        </div>
                      </>
                    ) : null}

                    {isProjectLeader && contributionToRewardCount ? (
                      <div className="flex items-center gap-1 rounded-full bg-spacePurple-900 px-1.5 py-0.5 text-sm font-medium text-spacePurple-400">
                        <StackLine className="text-base" />
                        {contributionToRewardCount}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  "-"
                )}
                {isProjectLeader ? (
                  <ActionMenu
                    actions={[
                      {
                        label: T("project.details.contributors.reward"),
                        onClick: () => onRewardGranted(contributor),
                        icon: <SendPlane2Line />,
                      },
                      {
                        label: T("project.details.contributors.actionMenu", { action: hidden ? "Show" : "Hide" }),
                        onClick: () => onToggleContributor(contributor),
                        icon: hidden ? <EyeLine /> : <EyeOffLine />,
                      },
                    ]}
                    className="right-0 top-1"
                  >
                    <Button as="div" className="w-8 px-2" variant="secondary" size="s">
                      <Icon remixName="ri-more-fill" size={12} />
                    </Button>
                  </ActionMenu>
                ) : null}
              </div>
            </div>
          );
        })}
      {hasNextPage && (
        <div className="py-6">
          <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} />
        </div>
      )}
    </Card>
  );
}

import { components } from "src/__generated/api";
import Card from "src/components/Card";
import Contributor from "src/components/Contributor";
import { ShowMore } from "src/components/Table/ShowMore";
import Medal2Fill from "src/icons/Medal2Fill";
import StackLine from "src/icons/StackLine";
import { AvailableConversion, AvailableConversionCurrency } from "src/components/Currency/AvailableConversion.tsx";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { Icon } from "components/layout/icon/icon.tsx";
import EyeOffLine from "src/icons/EyeOffLine.tsx";
import { useIntl } from "src/hooks/useIntl.tsx";
import ActionMenu from "components/layout/action-menu/action-menu.tsx";
import SendPlane2Line from "src/icons/SendPlane2Line.tsx";
import EyeLine from "src/icons/EyeLine.tsx";

type ViewMobileProps = {
  contributors: components["schemas"]["ContributorPageItemResponse"][];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isProjectLeader: boolean;
  onRewardGranted: (contributor: C) => void;
  onToggleContributor: (contributor: C) => void;
};

export function ViewMobile({
  contributors,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isProjectLeader,
  onRewardGranted,
  onToggleContributor,
}: ViewMobileProps) {
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
            amount: currency.totalAmount,
            dollar: currency.totalDollarsEquivalent,
          }));

          return (
            <div
              className="grid grid-cols-1 items-center justify-between gap-3 p-3 md:grid-cols-2 lg:grid-cols-2"
              key={login}
            >
              <Contributor contributor={contributor} clickable />
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
                  <Button
                    type={ButtonType.Secondary}
                    size={ButtonSize.Sm}
                    iconOnly
                    data-testid="toggle-contributors-action-menu"
                  >
                    <Icon remixName="ri-more-fill" size={12} />
                  </Button>
                </ActionMenu>
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

import { SettingsHeader } from "app/migration/settings/components/settings-header/settings-header";
import { useInvoicesTable } from "app/migration/settings/invoices/features/use-invoices-table/use-invoices-table";

import BillingProfilesApi from "src/api/billing-profiles";
import BillingApi from "src/api/me/billing";
import Table from "src/components/Table";
import HeaderCell from "src/components/Table/HeaderCell";
import HeaderLine from "src/components/Table/HeaderLine";
import { ShowMore } from "src/components/Table/ShowMore";

import { Card } from "components/ds/card/card";

export default function InvoicesPage() {
  const { headerCells, bodyRow } = useInvoicesTable({ onDownloadInvoice: () => {} });
  const { data: billingProfilesData } = BillingApi.queries.useAllBillingProfiles({});
  const {
    data: invoicesData,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = BillingProfilesApi.queries.useBillingProfileInvoices({
    params: { billingProfileId: billingProfilesData?.billingProfiles?.[0].id ?? "" },
  });

  const invoices = invoicesData?.pages?.flatMap(data => data.invoices);

  console.log("invoicesData", invoicesData);
  return (
    <div className="flex flex-col gap-6">
      <SettingsHeader title="v2.pages.settings.invoices.title" subtitle="v2.pages.settings.invoices.subtitle" />
      <Card className="relative flex w-full flex-col" background="base">
        <div>
          <Table
            id="invoices-table"
            theadClassName="border-card-border-medium"
            headers={
              <HeaderLine>
                {headerCells.map(cell => (
                  <HeaderCell key={cell.label} width={cell.width} className={cell.className} horizontalMargin>
                    {cell.icon}
                    <span>{cell.label}</span>
                  </HeaderCell>
                ))}
              </HeaderLine>
            }
          >
            {invoices?.map(bodyRow)}
          </Table>
        </div>
        {hasNextPage ? (
          <div className="py-3">
            <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} isInfinite={false} />
          </div>
        ) : null}
      </Card>
    </div>
  );
}

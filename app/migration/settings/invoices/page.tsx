"use client";

import { useEffect, useMemo, useState } from "react";

import { useInvoicesTable } from "app/migration/settings/billing/[id]/invoices/hooks/use-invoices-table/use-invoices-table";
import { SettingsHeader } from "app/migration/settings/components/settings-header/settings-header";

import BillingProfilesApi from "src/api/BillingProfiles";
import BillingApi from "src/api/me/billing";
import { IMAGES } from "src/assets/img";
import Table from "src/components/Table";
import HeaderCell from "src/components/Table/HeaderCell";
import HeaderLine from "src/components/Table/HeaderLine";
import { ShowMore } from "src/components/Table/ShowMore";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";

import { Card } from "components/ds/card/card";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";
import EmptyTablePlaceholder from "components/layout/placeholders/empty-table/empty-table-placeholder";
import { Translate } from "components/layout/translate/translate";

export default function InvoicesPage() {
  const { T } = useIntl();
  const showToaster = useShowToaster();

  const [invoiceMetaData, setInvoiceMetaData] = useState<{ invoiceId: string | undefined; number: string | undefined }>(
    { invoiceId: "", number: "" }
  );

  const { data: billingProfilesData } = BillingApi.queries.useAllBillingProfiles({});

  const {
    data: invoicesData,
    isLoading: isLoadingInvoices,
    isError: isErrorInvoices,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = BillingProfilesApi.queries.useBillingProfileInvoices({
    // TODO this is temporary until the user can select a billing profile
    params: { billingProfileId: billingProfilesData?.billingProfiles?.[0].id ?? "" },
  });

  const {
    data: downloadedInvoice,
    isError: isDownloadError,
    isLoading: isDownloading,
  } = BillingProfilesApi.queries.useDownloadBillingProfileInvoice({
    params: {
      billingProfileId: billingProfilesData?.billingProfiles?.[0].id ?? "",
      invoiceId: invoiceMetaData.invoiceId ?? "",
    },
    options: { enabled: Boolean(invoiceMetaData.invoiceId) },
  });

  useEffect(() => {
    if (downloadedInvoice) {
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(downloadedInvoice as Blob);
      downloadLink.download = invoiceMetaData.number ?? "invoice.pdf";
      downloadLink.click();
      setInvoiceMetaData({ invoiceId: "", number: "" });
    }
  }, [downloadedInvoice]);

  useEffect(() => {
    if (isDownloadError) {
      showToaster(T("v2.pages.settings.invoices.table.errorDownload"), { isError: true });
    }
  }, [isDownloadError]);

  function onDownloadInvoice({ invoiceId, number }: { invoiceId: string | undefined; number: string | undefined }) {
    setInvoiceMetaData({ invoiceId, number });
  }

  const { headerCells, bodyRow, bodyRowLoading } = useInvoicesTable({
    onDownloadInvoice,
    isDownloading,
  });
  const nbColumns = headerCells.length;

  const invoices = invoicesData?.pages?.flatMap(data => data.invoices);
  const hasInvoices = Boolean(invoices?.length);

  const renderDesktopContent = useMemo(() => {
    if (isLoadingInvoices) {
      return bodyRowLoading();
    }

    if (isErrorInvoices) {
      return (
        <EmptyTablePlaceholder colSpan={nbColumns}>
          <Translate token="v2.pages.settings.invoices.table.errorPlaceholder" />
        </EmptyTablePlaceholder>
      );
    }

    if (!hasInvoices) {
      return (
        <tr>
          <td colSpan={nbColumns}>
            <EmptyState
              illustrationSrc={IMAGES.global.categories}
              title={{ token: "v2.pages.settings.invoices.table.emptyPlaceholderTitle" }}
              description={{ token: "v2.pages.settings.invoices.table.emptyPlaceholderDescription" }}
            />
          </td>
        </tr>
      );
    }

    return invoices?.map(bodyRow);
  }, [isLoadingInvoices, isErrorInvoices, hasInvoices, invoices]);

  return (
    <div className="flex flex-col gap-6">
      <SettingsHeader
        title={<Translate token="v2.pages.settings.invoices.title" />}
        subtitle="v2.pages.settings.invoices.subtitle"
      />
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
            {renderDesktopContent}
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

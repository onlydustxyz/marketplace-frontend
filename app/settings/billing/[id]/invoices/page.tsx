"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { withBillingProfileAdminGuard } from "app/settings/components/billing-profile-admln-guard/billing-profile-admln-guard";

import BillingProfilesApi from "src/api/BillingProfiles";
import { IMAGES } from "src/assets/img";
import Table from "src/components/Table";
import HeaderCell from "src/components/Table/HeaderCell";
import HeaderLine from "src/components/Table/HeaderLine";
import { ShowMore } from "src/components/Table/ShowMore";
import { useShowToaster } from "src/hooks/useToaster";

import { withClientOnly } from "components/layout/client-only/client-only";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";
import EmptyTablePlaceholder from "components/layout/placeholders/empty-table/empty-table-placeholder";
import { Translate } from "components/layout/translate/translate";

import { useIntl } from "hooks/translate/use-translate";

import { useInvoicesTable } from "./hooks/use-invoices-table/use-invoices-table";

function InvoicesPage() {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const { id } = useParams<{ id: string }>();
  const [invoiceMetaData, setInvoiceMetaData] = useState<{ invoiceId: string | undefined; number: string | undefined }>(
    { invoiceId: "", number: "" }
  );
  const {
    data: invoicesData,
    isLoading: isLoadingInvoices,
    isError: isErrorInvoices,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = BillingProfilesApi.queries.useBillingProfileInvoices({
    params: {
      billingProfileId: id,
      queryParams: {
        sort: "CREATED_AT",
        direction: "DESC",
      },
    },
  });
  const {
    data: downloadedInvoice,
    isError: isDownloadError,
    isLoading: isDownloading,
  } = BillingProfilesApi.queries.useDownloadBillingProfileInvoice({
    params: {
      billingProfileId: id,
      invoiceId: invoiceMetaData.invoiceId ?? "",
    },
    options: { enabled: Boolean(invoiceMetaData.invoiceId) },
  });

  useEffect(() => {
    if (downloadedInvoice) {
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(downloadedInvoice);
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
      {hasNextPage ? (
        <div className="py-3">
          <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} isInfinite={false} />
        </div>
      ) : null}
    </div>
  );
}

export default withClientOnly(withAuthenticationRequired(withBillingProfileAdminGuard(InvoicesPage)));

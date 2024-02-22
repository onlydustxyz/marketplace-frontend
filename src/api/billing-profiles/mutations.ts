import { API_PATH } from "src/api/ApiPath";
import MeApi from "src/api/me";
import { UseUploaderProps, useBaseUploader } from "src/api/useBaseUploader";
import { QueryParams } from "src/utils/getEndpointUrl";

const useUploadInvoice = ({
  params,
  options = {},
}: UseUploaderProps<{ url: string }, { billingProfileId: string; invoiceId: string; queryParams?: QueryParams }>) => {
  return useBaseUploader<{ url: string }>({
    ...params,
    resourcePath: API_PATH.UPLOAD_INVOICE_LINKED_TO_PROFILE(params?.billingProfileId || "", params?.invoiceId || ""),
    invalidatesTags: [
      { queryKey: MeApi.tags.rewarded_pending_invoice(), exact: false },
      { queryKey: MeApi.tags.rewards(), exact: false },
    ],
    method: "POST",
    ...options,
  });
};

export default { useUploadInvoice };

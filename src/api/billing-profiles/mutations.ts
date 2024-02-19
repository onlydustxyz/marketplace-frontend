import { API_PATH } from "src/api/ApiPath";
import { UseUploaderProps, useBaseUploader } from "src/api/useBaseUploader";
import { QueryParams } from "src/utils/getEndpointUrl";

const useUploadInvoice = ({
  params,
  options = {},
}: UseUploaderProps<{ url: string }, { billingProfileId: string; invoiceId: string; queryParams?: QueryParams }>) => {
  return useBaseUploader<{ url: string }>({
    ...params,
    resourcePath: API_PATH.UPLOAD_INVOICE_LINKED_TO_PROFILE(params?.billingProfileId || "", params?.invoiceId || ""),
    method: "POST",
    ...options,
  });
};

export default { useUploadInvoice };

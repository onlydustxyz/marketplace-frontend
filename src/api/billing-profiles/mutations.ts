import { API_PATH } from "src/api/ApiPath";
import { UseUploaderProps, useBaseUploader } from "src/api/useBaseUploader";

const useUploadInvoice = ({
  params,
  options = {},
}: UseUploaderProps<{ url: string }, { billingProfileId: string }>) => {
  return useBaseUploader<{ url: string }>({
    resourcePath: API_PATH.UPLOAD_INVOICE_LINKED_TO_PROFILE(params?.billingProfileId || ""),
    method: "POST",
    ...options,
  });
};

export default { useUploadInvoice };

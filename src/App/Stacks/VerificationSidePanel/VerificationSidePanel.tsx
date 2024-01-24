import { useAuth0 } from "@auth0/auth0-react";
import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";
// @ts-expect-error something wrong with export
import { Veriff } from "@veriff/js-sdk";
import { useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_VERIFF_BASE_URL ?? "";
const API_KEY = process.env.NEXT_PUBLIC_VERIFF_API_KEY ?? "";

export function VerificationSidePanel() {
  const { user } = useAuth0();

  useEffect(() => {
    const veriff = Veriff({
      host: BASE_URL,
      apiKey: API_KEY,
      parentId: "veriff-root",
      onSession: function (err, response) {
        createVeriffFrame({
          url: response.verification.url,
          onEvent(msg) {
            switch (msg) {
              case MESSAGES.CANCELED:
                //
                break;
            }
          },
        });
      },
    });

    veriff.setParams({
      // TODO need to find out why this is undefined
      //vendorData: user?.id,
      vendorData: " ",
    });

    veriff.mount({
      // TODO translate
      submitBtnText: "Get verified",
    });
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div id="veriff-root"></div>
    </div>
  );
}

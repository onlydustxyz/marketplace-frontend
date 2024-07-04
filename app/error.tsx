"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Error as ErrorLayout } from "components/layout/error/error";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { T } = useIntl();
  const router = useRouter();

  useEffect(() => {
    console.log("ERROR", error);
  }, [error]);

  const [descStart, descLink, descEnd] = T("v2.commons.globalState.error.description").split("_");

  return (
    <div className={"m-auto w-full max-w-lg px-6"}>
      <ErrorLayout
        title={T("v2.commons.globalState.error.title")}
        message={
          <>
            {descStart}
            <a className="underline" href={"mailto:contact@onlydust.xyz"}>
              {descLink}
            </a>
            {descEnd}
          </>
        }
        onBack={() => router.push(NEXT_ROUTER.home.all)}
        onRefresh={reset}
      />
    </div>
  );
}

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { NEXT_ROUTER } from "constants/router";

import View from "./View";

export default function ErrorFallback({ error }: { error?: Error }) {
  const router = useRouter();

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <View
      isFixed={false}
      onBackClicked={() => {
        router.push(NEXT_ROUTER.home.all);
      }}
      onRefreshClicked={router.refresh}
    />
  );
}

"use client";

import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { FallbackProps } from "react-error-boundary";

import { NEXT_ROUTER } from "constants/router";

import View from "./View";

type Props = {
  isFixed?: boolean;
} & Partial<FallbackProps>;

export default function ErrorFallback(props?: Props) {
  const { isFixed = false } = props ?? {};
  // const { resetBoundary } = useErrorBoundary();
  const router = useRouter();

  if (isFixed) {
    return createPortal(
      <View
        isFixed={isFixed}
        onBackClicked={() => {
          // resetBoundary();
          router.push(NEXT_ROUTER.projects.all);
        }}
        onRefreshClicked={router.refresh}
      />,
      document.body
    );
  }
  return (
    <View
      isFixed={isFixed}
      onBackClicked={() => {
        // resetBoundary();
        router.push(NEXT_ROUTER.projects.all);
      }}
      onRefreshClicked={router.refresh}
    />
  );
}

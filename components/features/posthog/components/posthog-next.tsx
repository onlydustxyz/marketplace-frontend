"use client";

import { usePathname } from "next/navigation";
import { PosthogPageView } from "./posthog-page-view.tsx";

export default function PosthogNext() {
  const pathname = usePathname();

  return <PosthogPageView pathname={pathname} />;
}

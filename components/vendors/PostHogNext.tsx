"use client";

import { usePathname } from "next/navigation";
import PostHogPageView from "./PostHogPageView";

export default function PostHogNext() {
  const pathname = usePathname();

  return <PostHogPageView pathname={pathname} />;
}

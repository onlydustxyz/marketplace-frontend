import { useLocation } from "react-router-dom";
import { PosthogPageView } from "./posthog-page-view";

export default function PosthogReact() {
  const location = useLocation();

  return <PosthogPageView pathname={location.pathname} />;
}

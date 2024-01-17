import { useLocation } from "react-router-dom";
import PostHogPageView from "./PostHogPageView";

export default function PostHogReact() {
  const location = useLocation();

  return <PostHogPageView pathname={location.pathname} />;
}

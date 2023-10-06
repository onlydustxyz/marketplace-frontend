import { useNavigate } from "react-router-dom";
import { RoutePaths } from "src/components/App";
import { useErrorBoundary } from "react-error-boundary";
import View from "./View";

export default function ErrorFallback() {
  const { resetBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  return (
    <View
      onBackClicked={() => {
        resetBoundary();
        navigate(RoutePaths.Home);
      }}
      onRefreshClicked={() => navigate(0)}
    />
  );
}

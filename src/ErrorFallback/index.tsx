import { useNavigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import { FallbackProps, useErrorBoundary } from "react-error-boundary";
import View from "./View";
import { createPortal } from "react-dom";

type Props = {
  isFixed?: boolean;
} & Partial<FallbackProps>;

export default function ErrorFallback(props?: Props) {
  const { isFixed = false } = props ?? {};
  const { resetBoundary } = useErrorBoundary();
  const navigate = useNavigate();

  if (isFixed) {
    return createPortal(
      <View
        isFixed={isFixed}
        onBackClicked={() => {
          resetBoundary();
          navigate(RoutePaths.Home);
        }}
        onRefreshClicked={() => navigate(0)}
      />,
      document.body
    );
  }
  return (
    <View
      isFixed={isFixed}
      onBackClicked={() => {
        resetBoundary();
        navigate(RoutePaths.Home);
      }}
      onRefreshClicked={() => navigate(0)}
    />
  );
}

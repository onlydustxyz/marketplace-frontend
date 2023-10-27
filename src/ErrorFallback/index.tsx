import { useNavigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useErrorBoundary } from "react-error-boundary";
import View from "./View";
import { createPortal } from "react-dom";

type Props = {
  isFixed?: boolean;
};

export default function ErrorFallback({ isFixed }: Props) {
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
